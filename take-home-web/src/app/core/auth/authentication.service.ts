import {Injectable} from '@angular/core';
import {Role, User} from './model/user';
import {HttpClient} from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import {map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  public get role(): Role {
    return Role[this.currentUser.role];
  }

  public get currentUser(): User {
    const token = sessionStorage.getItem('auth_token');
    return token ? jwtDecode(token) as User : null;
  }

  login(username, password) {
    return this.http.post<any>(`/auth/login`, {username, password})
      .pipe(map(val => {
        sessionStorage.setItem('auth_token', val.access_token);
      }));
  }

  logout() {
    // remove auth token from local storage
    sessionStorage.removeItem('auth_token');
  }
}
