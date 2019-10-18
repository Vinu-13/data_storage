import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/common/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
  
    return this.checkLogin(url);
  }
  constructor(private authService: AuthService, private router: Router) {}
  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }
  
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
  
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
