import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { RegistroEntradaComponent } from './pages/registro-entrada/registro-entrada.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { VisualizarComponent } from './pages/visualizar/visualizar.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
   {
    path: '',
    canActivate: [AuthGuard],

    children: [
      {
        path: 'registro',
        component: RegistroEntradaComponent,
      },
      {
        path: 'consulta',
        component: ConsultaComponent,
     },
      {
        path: 'reporte',
        component: VisualizarComponent,
     },
      {
        path: 'usuarios',
        component: UsuariosComponent,
     },

     { path: '', redirectTo: '/login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
