import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeacherModalComponent } from './teacher-modal.component';



@NgModule({
    declarations: [TeacherModalComponent],
    imports: [SharedModule],
    exports: [TeacherModalComponent],
})
export class TeacherModalModule { }
