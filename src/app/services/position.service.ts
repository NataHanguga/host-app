import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Position } from '../models/position.model';
import { Rate } from '../models/rate.model';
import { RateService } from './rate.service';

@Injectable({
    providedIn: 'root'
})
export class PositionService {
    private readonly lsKey = 'L_Position';
    private positions: Position[] = [];

    constructor(private rateService: RateService) {
        const data = localStorage.getItem(this.lsKey);
        let rates = [];
        this.rateService.getRates().pipe(take(1)).subscribe(res => {
            rates = res;

            const findRate = (rate: number): Rate => rates.find((r: Rate) => r.rate === rate);

            this.positions = JSON.parse(data)
            ? JSON.parse(data) as Position[]
            : [ new Position('1', 'директор', findRate(13)),
                new Position('2', 'Заступника директора з навчальної роботи', findRate(13), 95),
                new Position('3', 'Технік', findRate(12)),
                new Position('4', 'Робітник з комплекснго обслуговування та ремонту приміщень ', findRate(11))];
        });
    }

    getPositions(): Observable<Position[]> {
        return of(this.positions);
    }

    addPosition(positon: Position): Observable<Position[]> {
        this.positions = [...this.positions, positon];

        this.setToLS(this.positions);
        return this.getPositions();
    }

    editPosition(positon: Position): Observable<Position[]> {
        this.positions = this.positions.map((r: Position) => {
            if (r.id === positon.id) {
                r = positon;
            }

            return r;
        });

        this.setToLS(this.positions);
        return this.getPositions();
    }


    deletePosition(id: string): Observable<Position[]> {
        this.positions = this.positions.filter((rate: Position) => rate.id !== id);

        this.setToLS(this.positions);
        return this.getPositions();
    }

    private setToLS(list: Position[]): void {
        localStorage.setItem(this.lsKey, JSON.stringify(list));
    }
}
