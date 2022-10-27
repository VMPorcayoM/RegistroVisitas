import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Oficina } from 'src/app/models/oficina';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-entrada',
  templateUrl: './registro-entrada.component.html',
  styleUrls: ['./registro-entrada.component.scss']
})
export class RegistroEntradaComponent implements OnInit {
  tiposIdent:string[]=['INE','Pasaporte','Licencia'];
  oficinas:Oficina[]=[];
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private httpService:HttpService,
    private router:Router) { }

  //Reactive form
  form = this.formBuilder.group({
    nombres: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: [''],
    tipoIdentif:['',Validators.required],
    NoIdent: ['', Validators.required],
    telefono:['', Validators.required],
    correo:[''],
    oficina:['', Validators.required],
    motivo:['', Validators.required],
    direccion:['', Validators.required],
    fechaIngreso:['', Validators.required]
  });

  ngOnInit(): void {
    this.form.get('fechaIngreso')?.patchValue(new Date().toISOString());
    this.httpService.getOficinas().subscribe((r)=>{
      this.oficinas=r;
    });

  }

  cerrarSesion(){
    this.authService.logout();
  }

   registrar(){
    if(!this.form.valid){
      alert('Llene todos los campos')
      console.log(this.form.value)
      return;
    }
    console.log('registrado')
   }

}
