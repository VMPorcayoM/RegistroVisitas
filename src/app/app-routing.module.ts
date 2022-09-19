import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { RegistroEntradaComponent } from './pages/registro-entrada/registro-entrada.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
        
  },
   {
    path: 'registro',
     component: RegistroEntradaComponent,
     canActivate: [AuthGuard],    
  },
  {
   path: 'consulta',
    component: ConsultaComponent,
    canActivate: [AuthGuard],    
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
