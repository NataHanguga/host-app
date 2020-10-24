import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeacherModalModule } from 'src/app/modules/teacher-modal/teacher-modal.module';
import { TeacherModalComponent } from 'src/app/modules/teacher-modal/teacher-modal.component';



@NgModule({
    declarations: [TeachersComponent],
    imports: [ SharedModule, TeachersRoutingModule, TeacherModalModule ],
    exports: [TeachersComponent],
    entryComponents: [TeacherModalComponent]
})
export class TeachersModule {}
