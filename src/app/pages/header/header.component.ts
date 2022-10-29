import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAdmin:boolean=false;
  constructor(

    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(this.authService.getType() == 'Admin'){
      this.isAdmin=true;
    }
  }
  cerrarSesion(){
    this.authService.logout();
  }
  registrar(){
    this.router.navigate(['/registro']);
  }
  consultar(){
    this.router.navigate(['/consulta']);
  }
  reporte(){
    this.router.navigate(['/reporte']);
  }
  usuarios(){
    this.router.navigate(['/usuarios']);
  }

}
