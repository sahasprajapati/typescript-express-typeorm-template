import { User } from '@api/models/Users/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export abstract class EntityBase extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'created_by_user_id' })
  // @Column({ name: 'created_by' })
  createdBy: User;

  @OneToOne(() => User)
  @JoinColumn({ name: 'updated_by_user_id' })
  // @Column({ name: 'updated_by' })
  updatedBy: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
