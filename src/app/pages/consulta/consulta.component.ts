import { Component, OnInit } from '@angular/core';
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
  mostrar:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
