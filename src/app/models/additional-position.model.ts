import { Rate } from './rate.model';

export class AdditionalPositionResponse {
    constructor(
        public id: string,
        public name: string,
        public rate: Rate = null,
        public amount: number = 1,
        public percent: number = 0,
    ) { }
}

export class AdditionalPositionRequest {
    constructor(
        public id: string,
        public name: string,
        public rate: string = null,
        public amount: number = 1,
        public percent: number = 0,
    ) { }
}
