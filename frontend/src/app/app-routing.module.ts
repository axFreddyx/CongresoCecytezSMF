import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { rolesGuard } from './guards/roles/roles-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'dashboard_a_p_c',
    loadChildren: () => import('./pages/dashboard-a-p-c/dashboard-a-p-c.module').then(m => m.DashboardAPCPageModule),
    canActivate: [rolesGuard],
    data: { roles: ['asistente', 'ponente', 'co_autor'] }
  },
  {
    path: 'dashboard_d',
    loadChildren: () => import('./pages/dashboard-d/dashboard-d.module').then(m => m.DashboardDPageModule),
    canActivate: [rolesGuard],
    data: { roles: ['dictaminador'] }
  },
  {
    path: 'dashboard_m',
    loadChildren: () => import('./pages/dashboard-m/dashboard-m.module').then(m => m.DashboardMPageModule),
    canActivate: [rolesGuard],
    data: { roles: ["moderador"] }
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersPageModule),
    canActivate: [rolesGuard],
    data: { roles: ["moderador", "administrador"] }
  },
  {
    path: 'comprobantes',
    loadChildren: () => import('./pages/moderador/comprobantes/comprobantes.module').then(m => m.ComprobantesPageModule),
    data: { roles: ["moderador", "administrador"] }
  },
  {
    path: 'dashboard_a',
    loadChildren: () => import('./pages/admin/dashboard-a/dashboard-a.module').then(m => m.DashboardAPageModule),
    canActivate: [rolesGuard],
    data: { roles: ['administrador'] }
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/admin/main/main.module').then(m => m.MainPageModule),
    canActivate: [rolesGuard],
    data: { roles: ['administrador'] }
  },
  {
    path: 'talleres',
    loadChildren: () => import('./pages/talleres/talleres.module').then(m => m.TalleresPageModule)
  },
  {
    path: 'mesas',
    loadChildren: () => import('./pages/mesas/mesas.module').then(m => m.MesasPageModule)
  },
  {
    path: 'update_user',
    loadChildren: () => import('./pages/update-user/update-user.module').then(m => m.UpdateUserPageModule),
    canActivate: [rolesGuard],
    data: { roles: ['administrador'] }
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then(m => m.AsistenciaPageModule),
    canActivate: [rolesGuard],
    data: { roles: ['moderador'] }
  },
  {
    path: 'escanear',
    loadChildren: () => import('./pages/escanear/escanear.module').then(m => m.EscanearPageModule),
    canActivate: [rolesGuard],
    data: { roles: ['moderador'] }
  },
  {
    path: 'unauthorized',
    loadChildren: () => import('./pages/unauthorized/unauthorized.module').then(m => m.UnauthorizedPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
