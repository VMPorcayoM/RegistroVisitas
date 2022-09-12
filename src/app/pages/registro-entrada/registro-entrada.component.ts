import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-registro-entrada',
  templateUrl: './registro-entrada.component.html',
  styleUrls: ['./registro-entrada.component.scss']
})
export class RegistroEntradaComponent implements OnInit {
  tiposIdent:string[]=['INE','Pasaporte','Licencia'];
  constructor(private formBuilder: FormBuilder) { }

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
  }

   

}
