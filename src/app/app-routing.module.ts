import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/rate' },
  { path: 'rate', loadChildren: () => import('./pages/rate/rate.module').then(m => m.RateModule) },
  { path: 'teachers', loadChildren: () => import('./pages/teachers/teachers.module').then(m => m.TeachersModule)},
  { path: 'tarifical-list', loadChildren: () => import('./pages/tarifical-list/tarifical-list.module').then(m => m.TarificalListModule)},
  { path: 'position', loadChildren: () => import('./pages/position/position.module').then(m => m.PositionModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
