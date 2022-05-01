import { UserRole } from '@api/enums/UserRole.enum';
import { HashService } from '@base/infrastructure/services/hash/HashService';

import { Exclude } from 'class-transformer';
import { Length } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  @Length(4, 20)
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  @Length(4, 100)
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // @OneToOne(() => Role)
  // @JoinColumn({ name: 'role_id' })
  // role: Role;

  //   @OneToOne((type) => Auth, (auth) => auth.user, { cascade: true })
  //   @JoinColumn()
  //   auth: Auth;

  //   @OneToOne((type) => Profile, { cascade: true })
  //   @JoinColumn()
  //   profile: Profile;

  //   @ManyToOne(() => Organization, (organization) => organization.users)
  //   organization: Organization;
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password)
      this.password = await new HashService().make(this.password);
    // const saltRounds = 10;
    // this.password = bcrypt.hashSync(this.password, saltRounds);
  }

  // checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
  //   return bcrypt.compareSync(unencryptedPassword, this.password);
  // }
}
