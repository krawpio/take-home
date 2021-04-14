export class User {
  id: number;
  firstName: string;
  lastName: string;
  role: Role;
}


export enum Role {
  CLIENT = 'CLIENT',
  REALTOR = 'REALTOR',
  ADMIN = 'ADMIN'
}
