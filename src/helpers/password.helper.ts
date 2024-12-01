import * as bcrypt from 'bcrypt';
export class BcryptService {
  private saltRounds: number;

  constructor(saltRounds = 10) {
    this.saltRounds = saltRounds;
  }

  async encryptText(text: string): Promise<string> {
    return bcrypt.hash(text, this.saltRounds);
  }

  async compareText(text: string, hash: string): Promise<boolean> {
    return bcrypt.compare(text, hash);
  }
}
