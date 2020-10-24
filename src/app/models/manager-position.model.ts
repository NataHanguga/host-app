import { Rate } from './rate.model';

export class ManagerPositionResponce {
    constructor(
        public id: string,
        public name: string,
        public rate: Rate = null,
        public teachHours: number = 1,
        public amount: number = 1,
        public percent: number = 0,
    ) {}
}

export class ManagerPositionRequest {
    constructor(
        public id: string,
        public name: string,
        public rate: string,
        public percent: number = 0,
        public teachHours: number = 1,
        public amount: number = 1,
    ) {}
}
