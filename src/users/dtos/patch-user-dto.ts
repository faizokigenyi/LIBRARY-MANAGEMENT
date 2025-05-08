import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-users-dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class PatchUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;
}
