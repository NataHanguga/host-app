import { NgModule } from '@angular/core';
import { RateModalComponent } from './rate-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
    declarations: [RateModalComponent],
    imports: [ SharedModule],
    exports: [RateModalComponent],
})
export class RateModalModule {}
