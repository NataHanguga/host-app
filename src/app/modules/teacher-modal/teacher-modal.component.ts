import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { takeUntil, take } from 'rxjs/operators';
import { UnsubscribeHook } from 'src/app/hooks/unsubscribe.hook';
import { PedagogicTitle } from 'src/app/models/pedagogic-title.model';
import { Rate } from 'src/app/models/rate.model';
import { Teacher } from 'src/app/models/teacher.model';
import { RateService } from 'src/app/services/rate.service';
import { ManagerPositionResponce } from 'src/app/models/manager-position.model';
import { ManagerPositionService } from 'src/app/services/manager-position.service';

@Component({
  selector: 'app-teacher-modal',
  templateUrl: './teacher-modal.component.html',
  styleUrls: ['./teacher-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherModalComponent extends UnsubscribeHook implements OnInit, AfterViewInit {
  @Input() teacher: Teacher = null;

  rateList: Rate[] = [];
  educationList: string[] = ['вищ І-ІІ', 'вищ ІІІ-ІV'];
  addPedagogicTitle = false;
  pedagogicTitleList: PedagogicTitle[] = [];
  managerTitleList: ManagerPositionResponce[] = [];
  addManagerTitle = false;

  constructor(
    private modal: NzModalRef,
    private rateService: RateService,
    private managerPositionService: ManagerPositionService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.getRateList();
    this.getManagerPositions();
    this.pedagogicTitleList = [
      new PedagogicTitle('викл.метод', 15),
      new PedagogicTitle('ст.викл', 10),
    ];

  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  private getManagerPositions(): void {
    this.managerPositionService
      .getList()
      .pipe(take(1))
      .subscribe((res) => {
        this.managerTitleList = res;
      });
  }

  private getRateList(): void {
    this.rateService
      .getList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: Rate[]) => {
        this.rateList = res;
        this.cd.detectChanges();
      });
  }

  addRate(event: string): void {
    // this.teacher.rateId = event;
    // this.teacher.setRate = (this.rateList.find(rate => rate.id === event));
    // console.log(event, this.teacher);
  }

  close(rate?: Teacher): void {
    this.modal.destroy(rate);
  }

  save(): void {
    this.close(this.teacher);
  }
}
