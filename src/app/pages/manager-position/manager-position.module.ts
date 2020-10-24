import { NgModule } from '@angular/core';
import { ManagerPositionComponent } from './manager-position.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagerPositionRoutingModule } from './manager-position-routing.module';
import { ManagerPositionService } from 'src/app/services/manager-position.service';
import { ManagerPositionModalModule } from 'src/app/modules/manager-position-modal/manager-position-modal.module';
import { PositionModalComponent } from 'src/app/modules/manager-position-modal/manager-position-modal.component';



@NgModule({
  declarations: [ManagerPositionComponent],
  imports: [ SharedModule, ManagerPositionRoutingModule, ManagerPositionModalModule ],
  providers: [ManagerPositionService],
  exports: [ManagerPositionComponent],
  entryComponents: [PositionModalComponent]
})
export class ManagerPositionModule { }
