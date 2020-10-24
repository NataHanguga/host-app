import { NgModule } from '@angular/core';
import { TarificalListComponent } from './tarifical-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TarificalListRoutingModule } from './tarifical-list-routing.module';



@NgModule({
    declarations: [TarificalListComponent],
    imports: [ SharedModule, TarificalListRoutingModule],
    exports: [TarificalListComponent],
})
export class TarificalListModule {}
