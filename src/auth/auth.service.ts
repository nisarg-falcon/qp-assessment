import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './auth.interface';
import { SignInDto } from './dto/auth.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { PasswordService } from 'src/helper/password.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}
  createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign(user);
  }
  async signIn(body: SignInDto): Promise<Partial<Auth>> {
    const user = await this.userService.getUserDetails(body.email);
    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }
    if (
      !(await this.passwordService.compareText(body.password, user.password))
    ) {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }
    const payload = {
      email: body.email,
      name: user.name,
      id: user.id,
      role: user.role,
    };
    delete user.password;
    return {
      access_token: await this.jwtService.signAsync(payload),
      ...user,
    };
  }
}
