import { Component, OnInit } from '@angular/core';
import { Packer } from 'docx';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeHook } from 'src/app/hooks/unsubscribe.hook';
import { DocumentCreation } from 'src/app/models/document.model';
import { Teacher } from 'src/app/models/teacher.model';
import { TeachersService } from 'src/app/services/teachers.service';
import { saveAs } from 'file-saver/FileSaver';
import { TarifTeacherData } from 'src/app/models/tarif-teacher-data.model';
import { AverageRateData } from 'src/app/models/average-rate-data.model';



@Component({
  selector: 'app-tarifical-list',
  templateUrl: './tarifical-list.component.html',
  styleUrls: ['./tarifical-list.component.scss']
})
export class TarificalListComponent extends UnsubscribeHook implements OnInit {
  teacherData: TarifTeacherData = null;
  constructor(private teachersService: TeachersService) {
    super();
  }

  ngOnInit(): void {
    this.getList();
  }

  private getList(): void {
    this.teachersService.getTeachers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.setTeacherList);
  }

  private setTeacherList = (list: Teacher[]): void => {
    this.teacherData = new TarifTeacherData(list);

    console.log(new AverageRateData(list));
  }

  public download(): void {
    const documentCreator = new DocumentCreation(this.teacherData);
    const doc = documentCreator.create();

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'тарифікаційні_списки.docx');
    });
  }
}
