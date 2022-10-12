import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged:boolean = false;
  private type:string='';
  constructor(private router: Router) { }
  loggedTrue() {  
    this.logged = true;
    this.router.navigate(['/consulta']);
  }
  loggedFalse() {  
    this.logged = false;
  }

  getLogged():boolean{
    return this.logged;
  }
  putType(type:string){
    this.type=type;
  }
  getType():string{
    return this.type;
  }

}
