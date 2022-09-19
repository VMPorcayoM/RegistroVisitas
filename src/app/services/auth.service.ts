import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged:boolean = false;
  constructor() { }
  loggedTrue() {  
    this.logged = true;
  }
  loggedFalse() {  
    this.logged = false;
  }

}
