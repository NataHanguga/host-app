import { NgModule } from '@angular/core';
import { PositionComponent } from './position.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PositionRoutingModule } from './position-routing.module';
import { ManagerPositionModule } from '../manager-position/manager-position.module';
import { AdditionalPositionModule } from '../additional-position/additional-position.module';



@NgModule({
    declarations: [PositionComponent],
    imports: [ SharedModule, PositionRoutingModule, ManagerPositionModule, AdditionalPositionModule],
    exports: [PositionComponent],
})
export class PositionModule {}
