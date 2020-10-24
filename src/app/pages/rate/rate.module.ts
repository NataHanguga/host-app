import { NgModule } from '@angular/core';

import { RateRoutingModule } from './rate-routing.module';

import { RateComponent } from './rate.component';
import { RateModalComponent } from 'src/app/modules/rate-modal/rate-modal.component';

import { RateModalModule } from 'src/app/modules/rate-modal/rate-modal.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [RateRoutingModule, SharedModule, RateModalModule],
  declarations: [RateComponent],
  exports: [RateComponent],
  entryComponents: [RateModalComponent]
})
export class RateModule { }
