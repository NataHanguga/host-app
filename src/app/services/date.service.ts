import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DateService {
    private date$ = new BehaviorSubject<Date>(new Date());

    getDay(): any {
        return moment([this.date$.value.toString() , 'LL', 'uk']);
    }

    setDay(day: Date): void {
        return this.date$.next(day);
    }
}
