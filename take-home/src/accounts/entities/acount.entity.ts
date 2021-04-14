import {BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Role} from '../../auth/enums/role.enum';
import {hashSync} from 'bcrypt';

export function hashPassword(password): string {
  return hashSync(password, Number(process.env.HASH_SALT));
}

@Entity()
export class Account {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  login: string;

  @Column()
  password: string;

  @Column({name: 'firstname'})
  firstName: string;

  @Column({name: 'lastname'})
  lastName: string;

  @Column()
  role: Role

  @BeforeInsert()
  @BeforeUpdate()
  onAdminCreate() {
    if (this.role === Role.ADMIN) {
      this.role = null;
    }
  }

  @BeforeInsert()
  hashPassword() {
    if (this.password) {
      this.password = hashPassword(this.password);
    }
  }
}
