import { CartEntity } from '../../cart/entities/cart.entity';
import { UserEntity } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  description: string;

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @ManyToOne(() => UserEntity, (user) => user.products)
  created_by: UserEntity;

  @ManyToMany(() => CartEntity, (cart) => cart.product)
  cart: CartEntity[];

  // Automatically sets the timestamp when the entity is created
  @CreateDateColumn()
  created_at: Date;

  // Automatically updates the timestamp when the entity is updated
  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ default: null })
  deleted_at: Date | null;
}
