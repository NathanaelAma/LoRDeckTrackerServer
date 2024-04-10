import { hash, compare } from 'bcrypt';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { UserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@/models/users.model';
import { isEmpty } from '@utils/util';

class FirebaseAuthService {
  public users = userModel;

  public async signup(userData: UserDto): Promise<User> {
    const auth = getAuth();

    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const firebaseUserData = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
      created_at: firebaseUserData.user.metadata.creationTime.toString(),
    });

    return createUserData;
  }

  public async login(userData: UserDto): Promise<{ cookie: string; findUser: User }> {
    const auth = getAuth();

    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const firebaseUserData = await signInWithEmailAndPassword(auth, userData.email, userData.password);

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default FirebaseAuthService;
