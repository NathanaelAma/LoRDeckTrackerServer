import { IsDateString, IsEmail, IsString, ValidateIf } from 'class-validator';

/**
 * Represents a user data transfer object.
 */
export class UserDto {
  /**
   * The username of the user.
   */
  @ValidateIf(o => !o.username)
  @IsString()
  public username: string;

  /**
   * The email address of the user.
   */
  @IsEmail()
  public email: string;

  /**
   * The password of the user.
   */
  @IsString()
  public password: string;
}

/**
 * Data transfer object for creating a user.
 */
export class CreateUserDto extends UserDto {
  /**
   * The creation timestamp of the user.
   */
  @IsDateString()
  public created_at?: string;
}

/**
 * Represents the data transfer object for updating a user.
 */
export class UpdateUserDto extends UserDto {
  /**
   * The updated timestamp of the user.
   */
  @IsDateString()
  public updated_at?: string;
}
