import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { RoleOptions } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

const usersList: User[] = [];

const user1 = new User();
user1.userId = '1j1241o23ow';
user1.name = 'teste';
user1.email = 'teste@email.com';
user1.password = '12345';
user1.phone_number = '12 998765544';
user1.user_active = true;
user1.role = RoleOptions.USER;
user1.created_at = new Date();
user1.updated_at = new Date();

usersList.push(user1);

const userUpdated = { ...user1 };
userUpdated.userId = '1j1241o23o2';
userUpdated.name = 'Nome Atualizado';
usersList.push(userUpdated);

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockReturnValue(usersList[0]),
            findAll: jest.fn().mockResolvedValue(usersList),
            findOne: jest.fn().mockResolvedValue(usersList[0]),
            findOneByEmail: jest.fn().mockResolvedValue(usersList[0]),
            update: jest.fn().mockResolvedValue(usersList[1]),
            remove: jest.fn().mockReturnValue(null),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should return created user when receive valid data', async () => {
      const body = new CreateUserDto();
      body.name = 'teste';
      body.email = 'teste@email.com';
      body.password = '12345';
      body.phone_number = '12 998765544';
      const result = await usersController.create(body);

      expect(result.name).toEqual(body.name);
      expect(usersService.create).toHaveBeenCalledWith(body);
    });

    it('should return bad request if missing data is supplied in body', async () => {
      const body = new CreateUserDto();
      body.name = 'teste';
      try {
        await usersController.create(body);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should return bad request if the user already exists', async () => {
      const body = new CreateUserDto();
      body.name = 'teste';
      body.email = 'teste@email.com';
      body.password = '12345';
      body.phone_number = '12 998765544';
      jest
        .spyOn(usersService, 'create')
        .mockRejectedValueOnce(new BadRequestException());
      expect(usersController.create(body)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const result = await usersController.findAll();

      expect(result).toEqual(usersList);
      expect(usersService.findAll).toBeCalled();
    });
  });

  describe('findOne', () => {
    it('should return the user related to the given id', async () => {
      const result = await usersController.findOne('1j1241o23ow');

      expect(result).toEqual(usersList[0]);
      expect(usersService.findOne).toBeCalled();
    });

    it('should return not found if receive a not registered id', async () => {
      jest
        .spyOn(usersService, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(usersController.findOne('123')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('findOneByEmail', () => {
    it('should return the user related to the given email', async () => {
      const result = await usersController.findOneByEmail('teste@email.com');

      expect(result).toEqual(usersList[0]);
      expect(usersService.findOneByEmail).toBeCalled();
    });

    it('should return not found if receive a not registered email', async () => {
      jest
        .spyOn(usersService, 'findOneByEmail')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(
        usersController.findOneByEmail('teste2@email.com'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('update', () => {
    it('should return the updated user info if receive valid data', async () => {
      const result = await usersService.update('1j1241o23o2', {
        name: 'Nome Atualizado',
      });

      expect(result.name).toEqual('Nome Atualizado');
      expect(usersService.update).toBeCalledTimes(1);
    });

    it('should return bad request if non valid data is given', async () => {
      const body = new UpdateUserDto();
      body.email = 'Abc';
      try {
        await usersController.update('1j1241o23o2', body);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should return not found if non registered id is given', async () => {
      const body = new UpdateUserDto();
      body.email = 'Abc';
      jest
        .spyOn(usersService, 'update')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(usersService.update('aaaaa', body)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should remove the user related to given id and return null', async () => {
      const result = await usersService.remove('1j1241o23o2');

      expect(result).toBeNull;
      expect(usersService.remove).toBeCalledTimes(1);
    });

    it('should return not found if not registered id is given', async () => {
      jest
        .spyOn(usersService, 'remove')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(usersService.remove('aaaa')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
