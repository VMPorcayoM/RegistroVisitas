import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Visita } from 'src/app/models/visita';
import { HttpService } from 'src/app/services/http.service';

interface VisitaTabla{
  folio?:string,
  nombres?:string,
  apellidos?:string,
  tipoIdent?:string,
  noIdent?:string,
  tel?:string,
  correo?:string,
  oficina?:string,
  fecha?:string,
  motivo?:string
}

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss']
})

export class VisualizarComponent implements OnInit {
  ELEMENT_DATA:VisitaTabla[]=[];
  dataSource:any;
  constructor(
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.httpService.getVisitas().subscribe(v =>{
      let vTabla:VisitaTabla={};
      v.forEach((visita:Visita)=>{
        vTabla={
          folio:visita.id,
          nombres:visita.nombres,
          apellidos:visita.apellidoPaterno +' '+visita.apellidoMaterno,
          tipoIdent:visita.tipoIdentificacion,
          noIdent:visita.NoIdentificacion,
          tel:visita.telefono,
          correo:visita.correo,
          oficina:visita.oficinaQueVisita,
          fecha:new Date(visita.fechaIngreso!).getDate()+"/"+new Date(visita.fechaIngreso!).getMonth()+'/'+new Date(visita.fechaIngreso!).getFullYear(),
          motivo:visita.motivo
        }
        this.ELEMENT_DATA.push(vTabla);
        this.dataSource=new MatTableDataSource(this.ELEMENT_DATA);
      });

    });
  }

  HEADER_DATA = ['Folio', 'Nombre(s)', 'Apellidos', 'Tipo Ident', 'No. Ident', 'Tel', 'Correo','Oficina','Fecha','Motivo'];




}
