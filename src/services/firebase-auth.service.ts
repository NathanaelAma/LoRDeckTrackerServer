import { hash, compare } from 'bcrypt';
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@/models/users.model';
import { isEmpty } from '@utils/util';
import { logger } from '@/utils/logger';

class FirebaseAuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    const auth = getAuth();
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const firebaseUserData = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const createUserData: User = await this.users.create({ userId: firebaseUserData.user.uid.toString(), ...userData, password: hashedPassword });
    console.log('firebaseUserData :>> ', firebaseUserData);
    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
    const auth = getAuth();
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const firebaseUserData = await signInWithEmailAndPassword(auth, userData.email, userData.password);

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    const auth = getAuth();
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    signOut(auth)
      .then(() => {
        logger.info('User signed out');
      })
      .catch(error => {
        logger.error(error);
      });

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { userId: user.userId };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default FirebaseAuthService;
