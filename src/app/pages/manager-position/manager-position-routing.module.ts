import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManagerPositionComponent } from './manager-position.component';

const routes: Routes = [
  { path: '', component: ManagerPositionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerPositionRoutingModule {}

