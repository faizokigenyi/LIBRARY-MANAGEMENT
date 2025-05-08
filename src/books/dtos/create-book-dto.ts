import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsDateString,
  IsISBN,
  IsNumber,
  Min,
  IsArray,
  IsInt,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @IsInt()
  authorId: number;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @IsOptional()
  @IsISBN('13', { message: 'ISBN must be a valid ISBN-13 format' })
  isbn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(512)
  summary?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  pageCount?: number;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  language?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  genres?: number[];
}
