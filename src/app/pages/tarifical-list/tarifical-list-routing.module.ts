import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarificalListComponent } from './tarifical-list.component';



const routes: Routes = [
    { path: '', component: TarificalListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TarificalListRoutingModule {}
