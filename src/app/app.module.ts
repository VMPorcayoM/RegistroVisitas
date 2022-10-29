import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroEntradaComponent } from './pages/registro-entrada/registro-entrada.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { VisualizarComponent } from './pages/visualizar/visualizar.component';
import { HeaderComponent } from './pages/header/header.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { GetelemetPipe } from './pipes/getelemet.pipe';
import * as fromPipes from './pipes';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroEntradaComponent,
    ConsultaComponent,
    VisualizarComponent,
    HeaderComponent,
    ...fromPipes.pipes,
    UsuariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ...fromPipes.pipes,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
