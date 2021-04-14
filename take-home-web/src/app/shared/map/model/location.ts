export interface Location {
  lat: number;
  lng: number;
}


export interface EntityLocation extends Location {
  id: number;
  mainText: string;
  link: string;
}
