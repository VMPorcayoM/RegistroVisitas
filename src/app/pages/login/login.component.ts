import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login(){
    let nickname= (<HTMLInputElement>document.getElementById('nickname')).value;
    let pass= (<HTMLInputElement>document.getElementById('pass')).value;

    this.httpService.auth(nickname, pass).subscribe(r=>{
      if(r){
        this.authService.loggedTrue();
      }else{
        alert('Nickname o contraseña incorrecto(s)');
      }
    });

  }

}
