import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import {Router} from '@angular/router';
import { Rol } from 'src/app/models/rol';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    let nickname= (<HTMLInputElement>document.getElementById('nickname')).value;
    let pass= (<HTMLInputElement>document.getElementById('pass')).value;

    this.httpService.auth(nickname, pass).subscribe(r=>{
      if(r){
        this.authService.loggedTrue();
        this.httpService.getUserType(nickname).subscribe((r:Rol[])=>{
          this.authService.putType(r[0].rol!);
          if(r[0].rol==='Recepcionista'){
            this.router.navigate(['/registro']);
          }else{
            this.router.navigate(['/consulta']);
          }

        });

      }else{
        alert('Nickname o contraseña incorrecto(s)');
      }
    });

  }

}
