import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile-dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class PatchProfileDto extends PartialType(CreateProfileDto) {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  userId: number;
}
