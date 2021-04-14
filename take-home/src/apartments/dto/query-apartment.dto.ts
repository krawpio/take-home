import {Between, MoreThanOrEqual} from 'typeorm';

export class QueryApartmentDto {
  area: string ;
  area_high: string;
  price: string ;
  price_high: string;
  rooms: string;
  rooms_high: string;

  constructor(query) {
    this.area = this.int_param(query.area, 0)
    this.area_high = this.int_param(query.area_high, undefined)
    this.price = this.int_param(query.price, 0)
    this.price_high = this.int_param(query.price_high, undefined)
    this.rooms = this.int_param(query.rooms, 0)
    this.rooms_high = this.int_param(query.rooms_high, undefined)
  }

  conditions() {
    return {
      where: {
        area: this.between_condition_option(this.area, this.area_high),
        price: this.between_condition_option(this.price, this.price_high),
        rooms: this.between_condition_option(this.rooms, this.rooms_high)
      }
    };
  }

  between_condition_option(low, height) {
    return height? Between(low, height) : MoreThanOrEqual(low)
  }

  int_param(val, default_val) {
    return val? +val : default_val
  }
}

