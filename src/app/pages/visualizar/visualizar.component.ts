import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Visita } from 'src/app/models/visita';
import { HttpService } from 'src/app/services/http.service';
const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from "pdfmake/build/vfs_fonts";

declare var pdfmake: any;

interface VisitaTabla {
  folio?: string,
  nombres?: string,
  apellidos?: string,
  tipoIdent?: string,
  noIdent?: string,
  tel?: string,
  correo?: string,
  oficina?: string,
  fecha?: string,
  motivo?: string
}

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss']
})

export class VisualizarComponent implements OnInit {
  ELEMENT_DATA: VisitaTabla[] = [];
  dataSource: any;
  constructor(
    private httpService: HttpService,
  ) {
    pdfMake!.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {

    this.httpService.getVisitas().subscribe(v => {
      let vTabla: VisitaTabla = {};
      v.forEach((visita: Visita) => {
        vTabla = {
          folio: visita.id,
          nombres: visita.nombres,
          apellidos: visita.apellidoPaterno + ' ' + visita.apellidoMaterno,
          tipoIdent: visita.tipoIdentificacion,
          noIdent: visita.NoIdentificacion,
          tel: visita.telefono,
          correo: visita.correo,
          oficina: visita.oficinaQueVisita,
          fecha: new Date(visita.fechaIngreso!).getDate() + "/" + new Date(visita.fechaIngreso!).getMonth() + '/' + new Date(visita.fechaIngreso!).getFullYear(),
          motivo: visita.motivo
        }
        this.ELEMENT_DATA.push(vTabla);
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      });

    });

  }

  HEADER_DATA = ['Folio', 'Nombre(s)', 'Apellidos', 'Tipo Ident', 'No. Ident', 'Tel', 'Correo', 'Oficina', 'Fecha', 'Motivo'];

  applyFilter(filterInput:HTMLInputElement) {// Remove whitespace
    let filterValue = filterInput.value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  generaReporte() {


    let visitas = this.ELEMENT_DATA.slice();
    var body = [];
    var titulos = new Array('Folio', 'Nombre(s)', 'Apellidos', 'Tipo Ident', 'No. Ident',
      'Tel', 'Correo', 'Oficina', 'Fecha', 'Motivo');
    body.push(titulos);
    for (var key in visitas) {
      if (visitas.hasOwnProperty(key)) {
        var visita = visitas[key];
        var fila = new Array();
        fila.push(visita.folio);
        fila.push(visita.nombres);
        fila.push(visita.apellidos);
        fila.push(visita.tipoIdent);
        fila.push(visita.noIdent);
        fila.push(visita.tel);
        fila.push(visita.correo);
        fila.push(visita.oficina);
        fila.push(visita.fecha);
        fila.push(visita.motivo);
        body.push(fila);
      }
    }

    var docDefinition = {
      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'landscape',

      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [30, 40, 30, 40],
      content: [
        { text: 'REPORTE DE VISITAS\n\n\n' },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            body: body
          }
        }]
    };//end docDefinition


    pdfMake.createPdf(docDefinition,'reporte').download();
  }

}
