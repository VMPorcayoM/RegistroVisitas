import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Oficina } from 'src/app/models/oficina';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { Visita } from 'src/app/models/visita';

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
    tipoIdent:['',Validators.required],
    noIdent: ['', Validators.required],
    telefono:['', Validators.required],
    correo:[''],
    oficina:['', Validators.required],
    direccion:['', Validators.required],
    fechaIngreso:['', Validators.required],
    motivo:['', Validators.required],
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
      return;
    }
    let visita:Visita={
      nombres:this.form.get('nombres')!.value,
      apellidoPaterno:this.form.get('apellidoPaterno')?.value,
      apellidoMaterno:this.form.get('apellidoMaterno')?.value,
      tipoIdentificacion:this.form.get('tipoIdent')?.value,
      NoIdentificacion:this.form.get('noIdent')?.value,
      telefono:this.form.get('telefono')?.value,
      correo:this.form.get('correo')?.value,
      oficinaQueVisita:this.form.get('oficina')?.value,
      direccion:this.form.get('direccion')?.value,
      fechaIngreso:this.form.get('fechaIngreso')?.value,
      motivo:this.form.get('motivo')?.value

    }
    this.httpService.agregarVisita(visita).subscribe(r=>{
      console.log(r);
    });       
    console.log('registrado')
   }

}
