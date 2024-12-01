import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ProductEntity } from '../../product/entities/product.entity';
import { CartEntity } from '../../cart/entities/cart.entity';
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  name: string;

  @Exclude()
  @Column({ length: 100, nullable: false })
  password: string;

  @Column({ length: 100, nullable: false, default: null })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => ProductEntity, (product) => product.created_by)
  products: ProductEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.user)
  cart: CartEntity[];
}
