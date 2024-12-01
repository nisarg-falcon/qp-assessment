import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Auth } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('sign-in')
  signIn(@Body() body: SignInDto): Promise<Partial<Auth>> {
    return this.authService.signIn(body);
  }
}
