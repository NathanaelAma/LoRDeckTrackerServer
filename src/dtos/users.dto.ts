import { IsEmail, IsString, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @ValidateIf(o => !o.username)
  @IsString()
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
