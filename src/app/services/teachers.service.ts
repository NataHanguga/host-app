import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Teacher } from '../models/teacher.model';

@Injectable({
    providedIn: 'root'
})
export class TeachersService {
    private readonly url = 'http://localhost:3000/teacher';
    // private teacherList: Teacher[] = [];

    constructor(private http: HttpClient) {
        // const ls = JSON.parse(localStorage.getItem(this.label));

        // this.teacherList = ls ? ls.map((t: Teacher) =>
        // new Teacher(t.name, t.year, t.id, t.rateId, t.expirience, t.education, t.teachHours, t.concertHours, t.pedagogicTitle)) : [];
    }

    getTeachers(): Observable<Teacher[]> {
        return this.http.get<Teacher[]>(this.url);
    }

    addTeacher(teacher: Teacher): Observable<Teacher> {
        // this.teacherList = [...this.teacherList, teacher];
        // this.setToLS(this.teacherList);

        return this.http.post<Teacher>(this.url, teacher);
    }

    editTeacher(teacher: Teacher): Observable<Teacher[]> {
        // this.teacherList = this.teacherList.map((t: Teacher) => {
        //     if (t.id === teacher.id) {
        //         t = teacher;
        //     }

        //     return t;
        // });
        // this.setToLS(this.teacherList);

        return this.getTeachers();
    }

    deleteTeacher(id: string): Observable<Teacher[]> {
        // this.teacherList = this.teacherList.filter((teacher: Teacher) => teacher.id !== id);
        // this.setToLS(this.teacherList);

        return this.getTeachers();
    }
}
