import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { TableHook } from 'src/app/hooks/table.hook';
import {
  AdditionalPositionResponse,
  AdditionalPositionRequest,
} from 'src/app/models/additional-position.model';
import { AdditionalPositionService } from 'src/app/services/additional-position.service';
import { NzModalService } from 'ng-zorro-antd';
import { take, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PositionModalComponent } from 'src/app/modules/manager-position-modal/manager-position-modal.component';

@Component({
  selector: 'app-additional-position',
  templateUrl: './additional-position.component.html',
  styleUrls: ['./additional-position.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalPositionComponent
    extends TableHook<AdditionalPositionResponse> {
  constructor(
    protected service: AdditionalPositionService,
    private modalService: NzModalService,
    protected cd: ChangeDetectorRef
  ) {
    super(service, cd);
  }

  private setPositionRequest(
    position: AdditionalPositionResponse
  ): AdditionalPositionRequest {
    return new AdditionalPositionRequest(
      position?.id,
      position?.name,
      position?.rate.id,
      position?.percent
    );
  }

  opensModal(position?: AdditionalPositionResponse): void {
    const title = position?.id ? 'Змінити' : 'Створити';
    console.log(title);

    const temp = !!position?.id
      ? this.setPositionRequest(position)
      : new AdditionalPositionRequest(null, null, null);

    const ref = this.modalService.create({
      nzTitle: title + ' робочу посаду',
        nzContent: PositionModalComponent,
      nzComponentParams: { position: temp },
      nzWidth: '600px',
      nzFooter: null,
    });

    ref.afterClose
      .pipe(
        take(1),
        filter((v) => !!v),
        switchMap((res: AdditionalPositionRequest) =>
          !!position ? this.editPosition(res) : this.createPosition(res)
        )
      )
      .subscribe(() => this.refresh());
  }

  editPosition(
    position: AdditionalPositionRequest
  ): Observable<AdditionalPositionResponse> {
    return this.service.edit(position).pipe(take(1));
  }

  createPosition(
    position: AdditionalPositionRequest
  ): Observable<AdditionalPositionResponse> {
    return this.service.add(position).pipe(take(1));
  }

  deletePosition(position: AdditionalPositionResponse): void {
    this.modalService.warning({
      nzTitle: `Ви дійсно хочете видалити керуючу посаду "${position.name}"?`,
      nzOkText: 'Так',
      nzCancelText: 'Ні',
      nzOnOk: () => this.deletePositionRequest(position.id),
    });
  }

  private deletePositionRequest(id: string): void {
    this.service
      .delete(id)
      .pipe(take(1))
      .subscribe(() => this.refresh());
  }
}
