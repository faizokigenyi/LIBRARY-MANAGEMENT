import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dtos/create-users-dto';
import { PatchUserDto } from './dtos/patch-user-dto';

@Controller('users')
export class UsersController {
  constructor(
    // inject users service
    private readonly usersService: UsersService,
  ) {}
  //  get all users
  @Get()
  public async getUsers() {
    return await this.usersService.getUsers();
  }

  //   get user by id
  @Get('{:id}')
  public async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getUserById(id);
  }

  // add a method to create user
  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  //   updateuser
  @Patch()
  public async updateUser(@Body() patchUserDto: PatchUserDto) {
    return await this.usersService.updateUser(patchUserDto);
  }
}
