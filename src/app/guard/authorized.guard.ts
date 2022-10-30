import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../service/localstorage.service';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {
  constructor(
    private service: LoginService,
    private router: Router,
    private localService: LocalstorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAdmin = this.service.getIsAdmin();
    if (isAdmin) {
      return true;
    } 
      this.router.navigate(['/login']);
      return false;
    
  }
}
