import {Injectable} from '@angular/core';
import {Location} from './model/location';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GeocodeService {

  constructor(private http: HttpClient) {}

  geocodeAddress(location: string): Observable<Location> {
    return this.http.get<Location>(`/geo/cords/${location}`);
  }
}
