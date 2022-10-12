import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { RegistroEntradaComponent } from './pages/registro-entrada/registro-entrada.component';

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
     } ,
     
     { path: '', redirectTo: '/login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
