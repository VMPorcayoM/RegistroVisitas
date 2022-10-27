import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Visita } from 'src/app/models/visita';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
interface Registro{
  folio: number,
  nombres: string,
  aPaterno: string,
  aMaterno: string,
}
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  mostrarVisita:boolean=false;
  mostrarNoHayVisita:boolean=false;
  visita:Visita={};
  constructor(
    private httpService:HttpService,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router: Router) { }

   //Reactive form
   form = this.formBuilder.group({
    folio: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  buscar(){
    if(!this.form.valid){
      return;
    }
    this.httpService.getVisita(this.form.get('folio')!.value).subscribe((r:Visita[])=>{

      if(r.length>0){
        this.mostrarNoHayVisita=false;
        this.visita=r[0];
        this.mostrarVisita=true;
      }else if(r.length===0){
        this.mostrarNoHayVisita=true;
        this.mostrarVisita=false;
      }


    });
  }
  cerrarSesion(){
    this.authService.logout();
  }

}
