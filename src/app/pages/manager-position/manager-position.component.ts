import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ManagerPositionService } from 'src/app/services/manager-position.service';
import { ManagerPositionResponce, ManagerPositionRequest } from 'src/app/models/manager-position.model';
import { Observable } from 'rxjs';
import { switchMap, take, filter } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd';
import { PositionModalComponent } from 'src/app/modules/manager-position-modal/manager-position-modal.component';
import { TableHook } from 'src/app/hooks/table.hook';

@Component({
  selector: 'app-manager-position',
  templateUrl: './manager-position.component.html',
  styleUrls: ['./manager-position.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerPositionComponent
  extends TableHook<ManagerPositionResponce>
  implements OnInit {

  constructor(
    private managerPositionService: ManagerPositionService,
    private modalService: NzModalService,
    protected cd: ChangeDetectorRef
  ) {
    super(managerPositionService, cd);
  }

  private setPositionRequest(
    position: ManagerPositionResponce
  ): ManagerPositionRequest {
    return new ManagerPositionRequest(
      position?.id,
      position?.name,
      position?.rate.id,
      position?.percent,
      position?.teachHours
    );
  }

  opensModal(position?: ManagerPositionResponce): void {
    const title = position?.id ? 'Змінити' : 'Створити';
    const temp = !!position?.id
      ? this.setPositionRequest(position)
      : new ManagerPositionRequest(null, null, null);

    const ref = this.modalService.create({
      nzTitle: title + ' керуючу посаду',
      nzContent: PositionModalComponent,
      nzComponentParams: { position: temp },
      nzWidth: '600px',
      nzFooter: null,
    });

    ref.afterClose
      .pipe(
        take(1),
        filter((v) => !!v),
        switchMap((res: ManagerPositionRequest) =>
          !!position ? this.editPosition(res) : this.createPosition(res)
        )
      )
      .subscribe(() => this.refresh());
  }

  editPosition(
    position: ManagerPositionRequest
  ): Observable<ManagerPositionResponce> {
    return this.managerPositionService.edit(position).pipe(take(1));
  }

  createPosition(
    position: ManagerPositionRequest
  ): Observable<ManagerPositionResponce> {
    return this.managerPositionService.add(position).pipe(take(1));
  }

  deletePosition(position: ManagerPositionResponce): void {
    this.modalService.warning({
      nzTitle: `Ви дійсно хочете видалити керуючу посаду "${position.name}"?`,
      nzOkText: 'Так',
      nzCancelText: 'Ні',
      nzOnOk: () => this.deletePositionRequest(position.id),
    });
  }

  private deletePositionRequest(id: string): void {
    this.managerPositionService
      .delete(id)
      .pipe(take(1))
      .subscribe(() => this.refresh());
  }
}
