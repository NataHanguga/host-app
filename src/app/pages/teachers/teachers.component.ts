import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { EMPTY, Observable } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { UnsubscribeHook } from 'src/app/hooks/unsubscribe.hook';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherModalComponent } from 'src/app/modules/teacher-modal/teacher-modal.component';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent extends UnsubscribeHook implements OnInit {
  teacherList: Teacher[] = [];
  loading = false;
  constructor(
    private teachersService: TeachersService,
    private modalService: NzModalService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getList();
  }

  openModal(id: string = null): void {
    const title = id ? 'Змінити' : 'Створити';
    const temp = id ? this.teacherList.find(el => el.id === id) : new Teacher(null, null, null, null, null, null);
    console.log(temp);

    const ref = this.modalService.create(
      {
        nzTitle: title + ' дані вчителя',
        nzContent: TeacherModalComponent,
        nzStyle: { width: '600px', 'min-width': '570px' },
        nzComponentParams: { teacher: temp },
        nzFooter: null
      }
    );

    ref.afterClose
      .pipe(
        take(1),
        filter(v => !!v),
        switchMap((res: Teacher) => id ? this.editTeacher(res) : this.addTeacher(res)))
      .subscribe();
  }

  deleteTeacher(item: Teacher): void {
    this.modalService.warning({
      nzTitle: `Ви дійсно хочете видалити ${item.name}?`,
      nzOkText: 'Так',
      nzCancelText: 'Ні',
      nzOnOk: () => this.deleteTeacherRequest(item.id)
    });
  }

  private addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.teachersService.addTeacher(teacher).pipe(take(1));
  }

  private editTeacher(teacher: Teacher): Observable<any> {
    return this.teachersService.editTeacher(teacher).pipe(take(1));
  }

  private deleteTeacherRequest(id: string): void {
    this.teachersService.deleteTeacher(id).pipe(take(1)).subscribe(this.setTeacherList);
  }

  private getList(): void {
    this.loading = true;
    this.teachersService.getTeachers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.setTeacherList);
  }

  private setTeacherList = (list: Teacher[]): void => {
    this.teacherList = list;
    this.loading = false;
  }
}
