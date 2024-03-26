import { hash } from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@/models/users.model';
import { isEmpty } from '@utils/util';

/**
 * Service for managing user-related operations.
 */
class UserService {
  public users = userModel;

  /**
   * Retrieves all users.
   * @returns A promise that resolves to an array of users.
   */
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  /**
   * Retrieves a user by their ID.
   * @param userId - The ID of the user to retrieve.
   * @returns A promise that resolves to the user.
   * @throws {HttpException} if the userId is empty or if the user doesn't exist.
   */
  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  /**
   * Retrieves a user by their username.
   * @param userName - The username of the user to retrieve.
   * @returns A promise that resolves to the user.
   * @throws {HttpException} if the userName is empty or if the user doesn't exist.
   */
  public async findUserByUsername(userName: string): Promise<User> {
    if (isEmpty(userName)) throw new HttpException(400, 'UserName is empty');

    const findUser: User = await this.users.findOne({ username: userName });
    if (!findUser) throw new HttpException(409, "Username doesn't exist");

    return findUser;
  }

  /**
   * Creates a new user.
   * @param userData - The data of the user to create.
   * @returns A promise that resolves to the created user.
   * @throws {HttpException} if the userData is empty or if the email already exists.
   */
  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
      creation_date: new Date().toISOString(),
    });

    return createUserData;
  }

  /**
   * Updates a user.
   * @param userName - The username of the user to update.
   * @param userData - The updated data of the user.
   * @returns A promise that resolves to the updated user.
   * @throws {HttpException} if the userData is empty, if the email already exists and belongs to a different user, or if the user doesn't exist.
   */
  public async updateUser(userName: string, userData: UpdateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser && findUser.username !== userName) throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = {
        ...userData,
        password: hashedPassword,
        updated_at: new Date().toISOString(),
      };
    }

    const updateUserByUserName: User = await this.users.findOneAndUpdate({ username: userName }, { userData });
    if (!updateUserByUserName) throw new HttpException(409, "User doesn't exist");

    return updateUserByUserName;
  }

  /**
   * Deletes a user.
   * @param userName - The username of the user to delete.
   * @returns A promise that resolves to the deleted user.
   * @throws {HttpException} if the user doesn't exist.
   */
  public async deleteUser(userName: string): Promise<User> {
    const deleteUserByUserName: User = await this.users.findOneAndDelete({ username: userName });
    if (!deleteUserByUserName) throw new HttpException(409, "User doesn't exist");

    return deleteUserByUserName;
  }
}

export default UserService;
