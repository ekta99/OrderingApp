import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from 'src/app/login/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(): boolean {
      if (this.loginService.isLoggedIn ) {
          return true;
      }
      this.router.navigate(['/login']);
      return false;
  }
}