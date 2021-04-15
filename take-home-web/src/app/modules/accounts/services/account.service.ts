import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Account} from '../model/account';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Deserialize, DeserializeArray, JsonArray, JsonObject} from 'cerializr';
import {MessageService} from '../../../core/messages/message.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  private static idParam(id: number): HttpParams {
    const httpParams = new HttpParams();
    return httpParams.append('id', id.toString());
  }

  getAccount(id: number): Observable<Account> {
    return this.http.get(`/accounts/${id}`).pipe(
      map((res: JsonObject) => Deserialize(res, Account))
    );
  }

  findAllRealtors(): Observable<Account[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('role', 'REALTOR');
    return this.http.get('/accounts/findByFilter', {params: httpParams}).pipe(
      map((res: JsonArray) => DeserializeArray(res, Account))
    );
  }

  createAccount(account: Account, url: string, message: string): Observable<Account> {
    return this.http.post<Account>(url, account)
      .pipe(
        tap(acc => this.messageService.sendInfo(message)));
  }

  delete(id: number) {
    return this.http.delete(`/accounts/${id}`)
      .pipe(tap(() => this.messageService.sendInfo(`Account has been deleted`)));
  }

  deleteAll(ids: number[]) {
    return this.http.post('/accounts/deleteAll', {ids: JSON.stringify(ids)})
      .pipe(tap(() => this.messageService.sendInfo(`Accounts (${ids.length}) have been deleted`)));
  }
}
