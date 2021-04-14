export class CreateApartmentDto {
  id: number;
  name: string;
  description: string;
  address:string
  area: number;
  price: number;
  rooms: number;
  createdDate: Date;
  realtorId: number;
  lat: number;
  long: number;
}
