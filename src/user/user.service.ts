import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<User>,
  ) {}
  async getUserDetails(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.create(userData);
      return await this.userRepository.save(user);
    } catch (error) {
      console.log('error: ', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
