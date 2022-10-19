import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private router: Router
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) {
      let res=this.authService.getLogged();
      if(res){
        if(this.authService.getType()==='registro'){
          return res;
        }else{
          return res;
        }

      }else{
        this.router.navigate(['login']);
        return res;
      }
  }

}
