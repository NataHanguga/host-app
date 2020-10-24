import { Component, OnInit, Input } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';
import { ManagerPositionRequest } from 'src/app/models/manager-position.model';
import { Rate } from 'src/app/models/rate.model';
import { take } from 'rxjs/operators';
import { NzModalRef } from 'ng-zorro-antd';
import { AdditionalPositionRequest } from 'src/app/models/additional-position.model';

@Component({
  selector: 'app-manager-position-modal',
  templateUrl: './manager-position-modal.component.html',
  styleUrls: ['./manager-position-modal.component.scss'],
})
export class PositionModalComponent implements OnInit {
  @Input() position: ManagerPositionRequest | AdditionalPositionRequest = null;

  rateList: Rate[] = [];

  constructor(private rateService: RateService, private modal: NzModalRef) {}

  ngOnInit(): void {
    this.rateService
      .getList()
      .pipe(take(1))
      .subscribe((rates: Rate[]) => (this.rateList = rates));
  }

  getRateLabel(rate: Rate): string {
    return `${rate?.rate} - ${rate?.title} - ${rate?.money}`;
  }

  close(position?: ManagerPositionRequest | AdditionalPositionRequest): void {
    this.modal.destroy(position);
  }

  save(): void {
    this.close(this.position);
  }
}
