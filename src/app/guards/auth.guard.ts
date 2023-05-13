import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from 'app/utils/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authSvc: AuthService) {}

  async canActivate(): Promise<boolean | UrlTree> {
    try {
      const loggedUser = await this.authSvc.isUserLoggedIn();
      if (loggedUser) {
        console.log('************** AUTH SUCCESS *************');
        return true;
      } else {
        console.error('************** AUTH FAILED *************');
        this.router.navigateByUrl('/login');
        return false;
      }
    } catch (err) {
      console.error('Error: [canActivate]', err);
    }
  }
  async canActivateChild(): Promise<boolean | UrlTree> {
    return await this.canActivate();
  }
}
