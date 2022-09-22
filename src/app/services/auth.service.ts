import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged:boolean = true;
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

}
