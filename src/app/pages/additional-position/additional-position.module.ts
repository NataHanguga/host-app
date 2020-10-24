import { NgModule } from '@angular/core';
import { AdditionalPositionComponent } from './additional-position.component';
import { AdditionalPositionService } from 'src/app/services/additional-position.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { PositionModalComponent } from 'src/app/modules/manager-position-modal/manager-position-modal.component';
import { ManagerPositionModalModule } from 'src/app/modules/manager-position-modal/manager-position-modal.module';

@NgModule({
    declarations: [AdditionalPositionComponent],
    imports: [ SharedModule, ManagerPositionModalModule ],
    exports: [AdditionalPositionComponent],
    providers: [AdditionalPositionService],
    entryComponents: [PositionModalComponent]
})
export class AdditionalPositionModule { }
