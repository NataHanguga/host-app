import { NgModule } from '@angular/core';
import { PositionModalComponent } from './manager-position-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [PositionModalComponent],
  imports: [ SharedModule ],
  exports: [PositionModalComponent]
})
export class ManagerPositionModalModule { }
