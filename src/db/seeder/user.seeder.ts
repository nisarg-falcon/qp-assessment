import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserEntity, UserRole } from '../../user/entities/user.entity';
import { BcryptService } from '../../helpers/password.helper';
export default class UserSeeder implements Seeder {
  /**
   * Track seeder execution.
   *
   * Default: false
   */
  track = true;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const bcryptService = new BcryptService();
    const repository = dataSource.getRepository(UserEntity);
    await repository.insert([
      {
        name: 'nisarg saple',
        role: UserRole.ADMIN,
        email: 'nisarg.saple@brainvire.com',
        password: await bcryptService.encryptText('Brain@2023'),
      },
      {
        name: 'rishabh joshi',
        role: UserRole.USER,
        email: 'rishabh.joshi@brainvire.com',
        password: await bcryptService.encryptText('test@123'),
      },
    ]);

    // ---------------------------------------------------

    const userFactory = await factoryManager.get(UserEntity);
    // save 1 factory generated entity, to the database
    await userFactory.save();

    // save 5 factory generated entities, to the database
    await userFactory.saveMany(5);
  }
}
