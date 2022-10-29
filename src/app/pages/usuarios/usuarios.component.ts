import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { HttpService } from 'src/app/services/http.service';
interface UsuarioTabla{
  nickname?:string,
  rol?:string
}
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  ELEMENT_DATA:UsuarioTabla[]=[];
  dataSource:any;
  HEADER_DATA = ['Nickname', 'Rol'];
  disabledRegistrarButton:boolean = false;
roles=['Admin','Recepcionista','Consultor']

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) { }

  //Reactive form
  form = this.formBuilder.group({
    nickname: ['', Validators.required],
    pass:['', Validators.required],
    rol: ['', Validators.required]
  });
  ngOnInit(): void {
    this.httpService.getUsuarios().subscribe(v =>{
      let vTabla:UsuarioTabla={};
      v.forEach((usuario:Usuario)=>{
        vTabla={
          nickname:usuario.nickname,
          rol:usuario.rol
        }
        this.ELEMENT_DATA.push(vTabla);
        this.dataSource=new MatTableDataSource(this.ELEMENT_DATA);
      });

    });
  }

  crearUsuario(){
    if(!this.form.valid){
      alert('Llene todos los campos');
      return;
    }
    this.disabledRegistrarButton=true;
    let usuario:Usuario={
      nickname:this.form.get('nickname')?.value,
      contrasena:this.form.get('pass')?.value,
      rol:this.form.get('rol')?.value
    }
    this.httpService.crearUsuario(usuario).subscribe(r=>{
      if(r){
        alert('Creado correctamente');
      }else{
        alert('Error al crear usuarios');
      }
      this.blankForm();
      this.disabledRegistrarButton=false;
    });
  }
  blankForm(){
    this.form.get('nickname')?.patchValue('');
    this.form.get('pass')?.patchValue('');
    this.form.get('rol')?.patchValue('');
   }



}
