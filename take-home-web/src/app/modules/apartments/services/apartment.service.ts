import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Apartment} from '../model/apartment';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Deserialize, DeserializeArray, JsonArray, JsonObject} from 'cerializr';
import {MessageService} from '../../../core/messages/message.service';


@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  private static idParam(id: number): HttpParams {
    const httpParams = new HttpParams();
    return httpParams.append('id', id.toString());
  }

  findAll(): Observable<Apartment[]> {
    return this.http.get('/apartments').pipe(
      map((res: JsonArray) => DeserializeArray(res, Apartment))
    );
  }

  findByQuery(parameters: HttpParams): Observable<Apartment[]> {
    return this.http.get('/apartments/findByFilter', {params: parameters}).pipe(
      map((res: JsonArray) => DeserializeArray(res, Apartment))
    );
  }

  getApartment(id: number): Observable<Apartment> {
    return this.http.get(`/apartments/${id}`).pipe(
      map((res: JsonObject) => Deserialize(res, Apartment))
    );
  }

  createApartment(apartment: Apartment): Observable<Apartment> {
    return this.http.post<Apartment>('/apartments', apartment)
      .pipe(
        tap(() => this.messageService.sendInfo(`Apartment ${apartment.name} has been created`)));
  }

  updateApartment(apartment: Apartment): Observable<Apartment> {
    return this.http.patch<Apartment>(`/apartments/${apartment.id}`, apartment).pipe(
      tap(() => this.messageService.sendInfo(`Apartment ${apartment.name} has been updated`))
    );
  }

  delete(id: number) {
    return this.http.delete(`/apartments/${id}`)
      .pipe(tap(() => this.messageService.sendInfo(`Apartment has been deleted`)));
  }

  deleteAll(ids: number[]) {
    return this.http.post('/apartments/deleteAll', {ids: JSON.stringify(ids)})
      .pipe(tap(() => this.messageService.sendInfo(`Apartments (${ids.length}) have been deleted`)));
  }
}
