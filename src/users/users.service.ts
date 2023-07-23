import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from './entities/user.entity';

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
      throw new Error('Usuário já cadastrado.');
    }

    const { address, ...userData } = createUserDto;

    const user = await this.prismaClient.user.create({
      data: userData,
    });

    if (address) {
      const addressCreateData = { ...address, user_id: user.userId };
      const addressCreated = await this.prismaClient.address.create({
        data: addressCreateData,
      });

      const userComplete = { ...user, addressCreated };

      return userComplete;
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaClient.user.findMany({
      include: {
        address: true,
      },
    });

    return users;
  }

  async findOne(id: string): Promise<User> {
    return await this.prismaClient.user.findFirst({
      where: {
        userId: id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
