import { PedagogicTitle } from './pedagogic-title.model';
import { Rate } from './rate.model';

export class Teacher {
  public rate: number;
  public money: number;
  public title?: string;
  public increase: number;
  constructor(
    public name: string,
    public year: number,
    public id: string,
    public rateId: string,
    public expirience: number,
    public education: string,
    public teachHours: number = 0,
    public concertHours: number = 0,
    public pedagogicTitle?: PedagogicTitle
  ) {
    this.updateIncrease();
  }

  set setRate(rate: Rate) {
    if (rate) {
      this.rate = rate.rate;
      this.money = rate.money;
      this.title = rate.title;
    }
  }

  updateIncrease(): void {
    this.increase = this.pedagogicTitle
        ? (this.pedagogicTitle.percent / 100) * this.money
        : 0;
  }
}

