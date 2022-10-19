import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged:boolean = false;
  private type:string='';
  constructor() { }
  loggedTrue() {
    this.logged = true;
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
