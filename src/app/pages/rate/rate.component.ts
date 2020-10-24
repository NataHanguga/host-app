import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';
import { Rate } from 'src/app/models/rate.model';
import { filter, switchMap, take } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd';
import { RateModalComponent } from 'src/app/modules/rate-modal/rate-modal.component';
import { TableHook } from 'src/app/hooks/table.hook';



@Component({
  selector: 'app-welcome',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateComponent extends TableHook<Rate> implements OnInit {
  constructor(
    private rateService: RateService,
    private modalService: NzModalService,
    protected cd: ChangeDetectorRef) {
    super(rateService, cd);
  }

  openModal(id: string = null): void {
    const title = id ? 'Змінити' : 'Створити';
    const temp = id ? this.list.find(el => el.id === id) : new Rate(null, null, null);

    const ref = this.modalService.create(
      {
        nzTitle: title + ' тарифну ставку',
        nzContent: RateModalComponent,
        nzComponentParams: { rate: temp },
        nzFooter: null
      }
    );

    ref.afterClose
      .pipe(
        take(1),
        filter(v => !!v),
        switchMap((res: Rate) => id ? this.edit(res) : this.add(res)))
      .subscribe(() => this.refresh());
  }

  deleteRate(item: Rate): void {
    this.modalService.warning({
      nzTitle: `Ви дійсно хочете видалити тарифну ставку "${item.title}"?`,
      nzOkText: 'Так',
      nzCancelText: 'Ні',
      nzOnOk: () => this.deleteRequest(item.id)
    });
  }
}
