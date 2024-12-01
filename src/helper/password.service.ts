import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private saltRounds: number = 10;

  async encryptText(text: string): Promise<string> {
    return bcrypt.hash(text, this.saltRounds);
  }

  async compareText(text: string, hash: string): Promise<boolean> {
    return bcrypt.compare(text, hash);
  }
}
