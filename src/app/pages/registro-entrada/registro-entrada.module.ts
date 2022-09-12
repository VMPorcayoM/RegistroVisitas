import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroEntradaComponent } from './registro-entrada.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: RegistroEntradaComponent,
  },
]

@NgModule({
  declarations: [RegistroEntradaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegistroEntradaModule { }
