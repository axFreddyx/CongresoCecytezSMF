import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard_a_p_c',
    loadChildren: () => import('./pages/dashboard-a-p-c/dashboard-a-p-c.module').then( m => m.DashboardAPCPageModule)
  },
  {
    path: 'dashboard_d',
    loadChildren: () => import('./pages/dasboard-d/dasboard-d.module').then( m => m.DasboardDPageModule)
  },
  {
    path: 'dashboard_m',
    loadChildren: () => import('./pages/dashboard-m/dashboard-m.module').then( m => m.DashboardMPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'comprobantes',
    loadChildren: () => import('./pages/moderador/comprobantes/comprobantes.module').then( m => m.ComprobantesPageModule)
  },
  {
    path: 'dashboard_a',
    loadChildren: () => import('./pages/admin/dashboard-a/dashboard-a.module').then( m => m.DashboardAPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/admin/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'talleres',
    loadChildren: () => import('./pages/talleres/talleres.module').then( m => m.TalleresPageModule)
  },
  {
    path: 'mesas',
    loadChildren: () => import('./pages/mesas/mesas.module').then( m => m.MesasPageModule)
  },
  {
    path: 'update_user',
    loadChildren: () => import('./pages/update-user/update-user.module').then( m => m.UpdateUserPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'escanear',
    loadChildren: () => import('./pages/escanear/escanear.module').then( m => m.EscanearPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
