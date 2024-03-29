import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule) },  {
    path: 'complete',
    loadChildren: () => import('./pages/complete/complete.module').then( m => m.CompletePageModule)
  },
  {
    path: 'boss',
    loadChildren: () => import('./pages/boss/boss.module').then( m => m.BossPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
