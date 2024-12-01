import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { SeederOptions } from 'typeorm-extension';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

ConfigModule.forRoot({ isGlobal: true });
const configService: ConfigService = new ConfigService();
const options: DataSourceOptions & SeederOptions = {
  type: configService.get<PostgresConnectionOptions['type']>('DB_DIALECT'),
  host: configService.get<PostgresConnectionOptions['host']>('DB_HOST'),
  port: configService.get<PostgresConnectionOptions['port']>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  migrations: [join(__dirname, '/db/migrations/*{.ts,.js}')],
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: false,
  logging: 'all',
  seeds: [join(__dirname, '/db/seeder/*{.ts,.js}')],
  seedTracking: true,
  factories: [join(__dirname, '/db/factories/*{.ts,.js}')],
};
export const AppDataSource = new DataSource(options);
