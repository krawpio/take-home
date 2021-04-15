import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Account} from '../../accounts/entities/acount.entity';
import {Exclude} from 'class-transformer';

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address:string

  @Column('real',)
  area: number;

  @Column('real')
  price: number;

  @Column()
  rooms: number;

  @Column({name: 'createddate'})
  createdDate: Date;

  @ManyToOne(() => Account, {eager: true, onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @JoinColumn([{ name: 'realtorid' , referencedColumnName: 'id'}])
  @Exclude()
  realtor: Account;

  @Column({name: 'realtorid'})
  realtorId :number


  @Column('real',{nullable: true})
  lat: number;

  @Column('real',{nullable: true})
  lng: number;

  @Column('bool')
  rentable: boolean
}
