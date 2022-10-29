import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Oficina } from 'src/app/models/oficina';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { Visita } from 'src/app/models/visita';
import { timeout } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-registro-entrada',
  templateUrl: './registro-entrada.component.html',
  styleUrls: ['./registro-entrada.component.scss']
})
export class RegistroEntradaComponent implements OnInit {

  @ViewChild("idFrontal", {
    read: ElementRef
  }) idFrontal!: ElementRef;

  @ViewChild("idTrasera", {
    read: ElementRef
  }) idTrasera!: ElementRef;

  disabledRegistrarButton: boolean = false;
  tiposIdent:string[]=['INE','Pasaporte','Licencia'];
  oficinas:Oficina[]=[];
  img1Base64:any='';
  img2Base64:any='';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private httpService:HttpService,
    private router:Router) {

     }

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
    motivo:['', Validators.required]
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
    this.disabledRegistrarButton=true;
    if(!this.form.valid || this.idFrontal.nativeElement.files.length === 0
       || this.idTrasera.nativeElement.files.length===0){
      alert('Llene todos los campos')
      return;
    }
    this.getBase64();
    setTimeout(() => {
      let visita:Visita={
        nombres:this.form.get('nombres')?.value,
        apellidoPaterno:this.form.get('apellidoPaterno')?.value,
        apellidoMaterno:this.form.get('apellidoMaterno')?.value,
        tipoIdentificacion:this.form.get('tipoIdent')?.value,
        NoIdentificacion:this.form.get('noIdent')?.value,
        telefono:this.form.get('telefono')?.value,
        correo:this.form.get('correo')?.value,
        oficinaQueVisita:this.form.get('oficina')?.value,
        direccion:this.form.get('direccion')?.value,
        fechaIngreso:this.form.get('fechaIngreso')?.value,
        identificacionFrontal:this.img1Base64,
        identificacionTrasera:this.img2Base64,
        motivo:this.form.get('motivo')?.value

      }

        console.log(visita);
        this.httpService.agregarVisita(visita).subscribe((r:string)=>{
          console.log(r);
          if(r!=='error'){
            alert('El folio de la visita es: '+r);
          }else{
            alert('Error de registro');
          }
          this.disabledRegistrarButton=false;
          this.blankForm();
        });
    },100);

   }

   blankForm(){
    this.form.get('nombres')?.patchValue('');
    this.form.get('apellidoPaterno')?.patchValue('');
    this.form.get('apellidoMaterno')?.patchValue('');
    this.form.get('tipoIdent')?.patchValue('');
    this.form.get('noIdent')?.patchValue('');
    this.form.get('telefono')?.patchValue('');
    this.form.get('correo')?.patchValue('');
    this.form.get('oficina')?.patchValue('');
    this.form.get('direccion')?.patchValue('');
    this.form.get('fechaIngreso')?.patchValue('');
    this.form.get('motivo')?.patchValue('');
   }

   getBase64() {
    let file1=this.idFrontal.nativeElement.files[0];
    let file2=this.idTrasera.nativeElement.files[0];
    let reader = new FileReader();
    let reader2 = new FileReader();
    reader.readAsDataURL(file1);
    reader2.readAsDataURL(file2);
    let Base641:any='';
    let Base642:any='';
    reader.onload = function () {
      //me.modelvalue = reader.result;
      Base641=reader.result?.toString().replace(/^data:(.*,)?/, "");


    };
    reader2.onload = function () {
      //me.modelvalue = reader.result;
      Base642=reader2.result?.toString().replace(/^data:(.*,)?/, "");

    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      Base641='errorToBase64';
    };
    reader2.onerror = function (error) {
      console.log('Error2: ', error);
      Base642='errorToBase64 2';
    };
    setTimeout(() => {
      this.img1Base64=Base641;
      this.img2Base64=Base642;
    },100);

 }

}
