import { UserRole } from '@api/enums/UserRole.enum';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

export class RegisterRequest {
  @MaxLength(20)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(20)
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  @IsString()
  role: UserRole;
}
