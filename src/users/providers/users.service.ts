import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-users-dto';
import { PatchUserDto } from '../dtos/patch-user-dto';

@Injectable()
export class UsersService {
  constructor(
    // inject Repository
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // check if user exists in the database
    const user = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (user) {
      throw new ConflictException('User with this email already exists');
    }
    // create user
    const newUser = this.usersRepository.create(createUserDto);
    // save user
    const savedUser = await this.usersRepository.save(newUser);
    return savedUser;
    return;
  }

  public async getUsers() {
    const users = await this.usersRepository.find(
      // { relations: ['profile'] } // load profile if it exists
      {
        relations: ['profile', 'books', 'comments'],
      },
    );
    return users;
  }

  public async getUserById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  public async updateUser(patchUserDto: PatchUserDto) {
    // check if user exists in the database
    const user = await this.usersRepository.findOneBy({ id: patchUserDto.id });

    if (!user) {
      return { message: `user with id ${patchUserDto.id} not found` };
    } else {
      // update user
      user.firstName = patchUserDto.firstName ?? user.firstName;
      user.lastName = patchUserDto.lastName ?? user.lastName;
      user.email = patchUserDto.email ?? user.email;
      user.password = patchUserDto.password ?? user.password;
      // save user
      const updatedUser = await this.usersRepository.save(user);
      return updatedUser;
    }
  }
}
