import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book-dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class PatchBookDto extends PartialType(CreateBookDto) {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
