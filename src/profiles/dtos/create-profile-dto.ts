import {
  IsString,
  IsOptional,
  MaxLength,
  IsUrl,
  IsPhoneNumber,
  IsDateString,
  IsInt,
} from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(128)
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  city?: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  gender?: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  twitterHandle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  linkedinHandle?: string;

  @IsInt()
  userId: number;
}
