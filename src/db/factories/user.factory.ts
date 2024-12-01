import { UserEntity } from '../../user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import * as crypto from 'crypto';
import { BcryptService } from '../../helpers/password.helper';
export default setSeederFactory(UserEntity, async (faker) => {
  const bcryptService = new BcryptService();
  const user = new UserEntity();
  user.name = faker.person.firstName();
  user.email = faker.internet.email({ firstName: user.name }).toLowerCase();
  user.password = await bcryptService.encryptText(
    crypto.randomBytes(5).toString('hex'),
  );
  return user;
});
