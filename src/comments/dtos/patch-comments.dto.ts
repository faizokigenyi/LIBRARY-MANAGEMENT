import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCommentDto } from './create-comment-dto';

export class PatchCommentDto extends PartialType(CreateCommentDto) {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;
}
