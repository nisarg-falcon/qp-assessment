import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from './user.interface';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  findUser(@Req() request: Request): string {
    console.log('request: ', request);
    return 'My name is rishabh joshi';
  }
  @UseGuards(AuthGuard)
  @Get('details')
  async getUserDetails(email: string): Promise<User> {
    return this.userService.getUserDetails(email);
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
}
