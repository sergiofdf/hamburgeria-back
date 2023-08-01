import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaClient: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.prismaClient.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExists) {
      throw new BadRequestException('Usuário já cadastrado.');
    }

    const { address, ...userData } = createUserDto;

    userData.password = bcrypt.hashSync(createUserDto.password, 10);

    const createdUser = await this.prismaClient.user.create({
      data: userData,
    });

    if (address) {
      const addressCreateData = { ...address, user_id: createdUser.userId };
      const addressCreated = await this.prismaClient.address.create({
        data: addressCreateData,
      });

      const userComplete = {
        ...createdUser,
        password: undefined,
        addressCreated,
      };

      return userComplete;
    }

    return { ...createdUser, password: undefined };
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaClient.user.findMany({
      include: {
        address: true,
      },
    });

    const usersResponse = users.map((user) => {
      const addressResponse = { ...user.address, user_id: undefined };
      const userWithoutPassword = {
        ...user,
        password: undefined,
        address: addressResponse,
      };

      return userWithoutPassword;
    });

    return usersResponse;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        userId: id,
      },
      include: {
        address: true,
      },
    });

    if (!user) return null;
    const addressResponse = { ...user.address, user_id: undefined };
    return { ...user, password: undefined, address: addressResponse };
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.prismaClient.user.findUnique({
      where: {
        email,
      },
      include: {
        address: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { address, ...data } = updateUserDto;

    const userExists = await this.findOne(id);

    if (!userExists) {
      throw new NotFoundException('Usuário não cadastrado.');
    }

    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }

    const userUpdated = await this.prismaClient.user.update({
      where: {
        userId: id,
      },
      data,
    });

    if (address) {
      await this.prismaClient.address.update({
        data: address,
        where: {
          user_id: id,
        },
      });

      const usersCompleteUpdated = await this.findOne(id);

      return { ...usersCompleteUpdated, password: undefined };
    }
    return { ...userUpdated, password: undefined };
  }

  async remove(id: string) {
    const userExists = await this.findOne(id);

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (userExists.address) {
      await this.prismaClient.address.delete({
        where: {
          user_id: id,
        },
      });
    }

    await this.prismaClient.user.delete({
      where: {
        userId: id,
      },
    });
  }
}
