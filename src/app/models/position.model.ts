import { Rate } from './rate.model';

export class Position {
    constructor(
        public id: string,
        public name: string,
        public value: Rate,
        public percent: number = 100,
        public amount: number = 1
    ) {}
}
