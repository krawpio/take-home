import {HttpService, Injectable} from '@nestjs/common';
import {map, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';


@Injectable()
export class GeoService {
  constructor(
    private httpService: HttpService,
  ) {
  }


  cords(location: string) {
    const params = {
      params: {
        key: 'AIzaSyDqOimSaX9wDOGxc_H2K_ns2kNoWYo27Kc',
        address: location
      }
    };
    return this.httpService.get<JSON>(`https://maps.googleapis.com/maps/api/geocode/json`, params)
      .pipe(
        tap((res) => {
          if (res.data['status'] !== 'OK') {
            return throwError('Address not found');
          }
        }),
        map((res) => {
          return {
            lat: res.data['results'][0].geometry.location.lat,
            lng: res.data['results'][0].geometry.location.lng
          };
        })
      );
  }
}
