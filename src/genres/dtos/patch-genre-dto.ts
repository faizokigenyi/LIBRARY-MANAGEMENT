import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateGenreDto } from './create-genre-dto';

export class PatchGenreDto extends PartialType(CreateGenreDto) {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;
}
