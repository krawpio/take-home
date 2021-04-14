import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthenticationService} from './authentication.service';
import {AuthModule} from './auth.module';

@Injectable({ providedIn: AuthModule })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUser;
    if (currentUser) {
      const userRole = this.authenticationService.role;
      if (route.data.role && !route.data.role.includes(userRole)) {
        this.router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});


    return false;
  }
}
