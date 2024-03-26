import { IsDateString, IsEmail, IsString, ValidateIf } from 'class-validator';

export class UserDto {
  @ValidateIf(o => !o.username)
  @IsString()
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class CreateUserDto extends UserDto {
  @IsDateString()
  public created_at?: string;
}

export class UpdateUserDto extends UserDto {
  @IsDateString()
  public updated_at?: string;
}
