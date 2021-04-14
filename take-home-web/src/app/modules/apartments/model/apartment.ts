import {autoserializeAs} from 'cerializr';
import {Column} from '../../../shared/search/grid-table/decorators/column';
import {ColumnModelType} from '../../../shared/search/grid-table/decorators/column.model';
import {EntityLocation} from '../../../shared/map/model/location';

export class Apartment implements EntityLocation {
  @autoserializeAs(Number)
  id: number;

  @autoserializeAs(String)
  @Column({
    title: 'Name',
    routerLink: '/apartment/',
    routerLinkIdName: 'id'
  })
  name: string;

  @autoserializeAs(Date)
  @Column({
    title: 'Add Date',
    type: ColumnModelType.DATE,
  })
  createdDate: Date;

  @autoserializeAs(String)
  description: string;

  @autoserializeAs(String)
  @Column({
    title: 'Address',
  })
  address: string;

  @autoserializeAs(Number)
  @Column({
    title: 'Floor area size',
    type: ColumnModelType.NUMBER,
    format: '1.0-1',
    sufix: ' m2'
  })
  area: number;

  @autoserializeAs(Number)
  @Column({
    title: 'Price per month',
    format: '1.0-1',
    prefix: '$'
  })
  price: number;

  @autoserializeAs(Number)
  @Column({
    title: 'Number of rooms',
  })
  rooms: number;

  @autoserializeAs(String)
  @Column({
    title: 'Realtor Name',
  })
  realtorName: string;

  @autoserializeAs(Boolean)
  @Column({
    title: 'Rentable',
    dict: {
      true: 'Free to rent',
      false: 'Rented',
    },
    chipDict: {
      true: '#37783b',
      false: '#c12a3c',
    }
  })
  rentable: boolean;

  @autoserializeAs(Number)
  realtorId: number;

  @autoserializeAs(Number)
  lat: number;

  @autoserializeAs(Number)
  lng: number;

  get mainText() {
    return '$' + `${this.price}`;
  }

  get link() {
    return 'apartment/';
  }
}



