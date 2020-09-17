export class NumberToString {
    constructor(
        public money: number,
        public coin: number
    ) {}

    public getDescription(): string {
        const money = this.sizeAdding(this.money, ['гривня', 'гривні', 'гривень']);
        const coins = this.sizeAdding(this.coin, ['копійка', 'коійки', 'копійок']);

        return `${money} ${coins}`;
    }

    private sizeAdding(num: number, size: string[]): string {
        const lastNum = +num.toString().slice(-1);
        const word = this.numberToStringDescription(num);

        return lastNum === 1
            ? `${word} ${size[0]}`
            : lastNum > 1 && lastNum < 5
                ? `${word} ${size[1]}`
                : `${word} ${size[2]}`;
    }

    private numberToStringDescription(sum: number): string {
        if (sum === 0) {
            return 'нуль';
        }

        const length = sum.toString().length;
        // 1 000 000
        switch (length) {
            case 1: return this.simpleNumberToString(sum);
            case 2: return this.twoSignNumberToString(sum);
            case 3: return this.threeSignNumberToString(sum);
            case 4: return this.fourSignNumberToString(sum);
            case 5: return this.fiveSignNumberToString(sum);
            case 6: return this.sixSignNumberToString(sum);
            case 7: return this.sevenSignNumberToString(sum);
            default:
                break;
        }
    }

    private simpleNumberToString(num: number): string {
        switch (num) {
            case 1: return 'однa';
            case 2: return 'двi';
            case 3: return 'три';
            case 4: return 'чотири';
            case 5: return `п'ять`;
            case 6: return 'шість';
            case 7: return 'сім';
            case 8: return 'вісім';
            case 9: return `дев'ять`;
            default: return '';
        }
    }

    private twoSignNumberToString(num: number): string {
        if (num >= 10 && num < 20) {
            switch (num) {
                case 11: return 'одинадцять';
                case 12: return 'дванвдцять';
                case 13: return 'тринадцять';
                case 14: return 'чотирнадцять';
                case 15: return `п'ятнадцять`;
                case 16: return 'шістнадцять';
                case 17: return 'сімнадцять';
                case 18: return 'вісімнадцять';
                case 19: return `дев'ятнадцять`;
                default: return 'десять';
            }
        } else {
            const firstNum = +num.toString()[0];
            const secondNum = +num.toString()[1];

            return `${this.dificultTwoSIgnNumber(firstNum)} ${this.simpleNumberToString(secondNum)}`;
        }
    }

    private dificultTwoSIgnNumber(num: number): string {
        switch (num) {
            case 2: return 'двадцять';
            case 3: return 'тридцять';
            case 4: return 'сорок';
            case 5: return `п'ятдесят`;
            case 6: return 'шістдесят';
            case 7: return 'сімдесят';
            case 8: return 'вісімдесят';
            case 9: return `дев'яносто`;
            default: return '';
        }
    }

    private threeSignNumberToString(num: number): string {
        const firstNum = +num.toString()[0];
        const twoSignNum = +num.toString().slice(1, 3);

        const twoSignNumDescription = twoSignNum.toString().length === 2
            ? this.twoSignNumberToString(twoSignNum)
            : this.simpleNumberToString(twoSignNum);

        return `${this.geneateThreeSignNumber(firstNum)} ${twoSignNumDescription}`;
    }

    private geneateThreeSignNumber(num: number): string {
        switch (num) {
            case 1: return 'сто';
            case 2: return 'двісті';
            case 3: return 'триста';
            case 4: return 'чотириста';
            case 5: return `п'ятсот`;
            case 6: return 'шістсот';
            case 7: return 'сімсот';
            case 8: return 'вісімсот';
            case 9: return `дев'ятсот`;
            default: return '';
        }
    }

    private fourSignNumberToString(num: number): string {
        const firstNum = +num.toString()[0];
        const threeSignNum = +num.toString().slice(1, 4);
        const hundred = threeSignNum > 99
            ? this.threeSignNumberToString(threeSignNum)
            : this.twoSignNumberToString(threeSignNum);

        return `${this.thouthandAdding(firstNum, this.simpleNumberToString(firstNum))} ${hundred}`;
    }

    private fiveSignNumberToString(num: number): string {
        const twoFirstSign = +num.toString().slice(0, 2);
        const lastSign = +num.toString().slice(2, 5);
        const thousand = this.thouthandAdding(twoFirstSign, this.twoSignNumberToString(twoFirstSign));

        return `${thousand} ${this.threeSignNumberToString(lastSign)}`;
    }

    private thouthandAdding(num: number, word: string): string {
        const lastNum = +num.toString().slice(-1);
        return lastNum === 1
            ? `${word} тисяча`
            : lastNum < 5
                ? `${word} тисячі`
                : `${word} тисяч`;
    }

    private sixSignNumberToString(num: number): string {
        const twoFirstSign = +num.toString().slice(0, 3);
        const lastSign = +num.toString().slice(3, 6);
        const thousand = this.thouthandAdding(twoFirstSign, this.twoSignNumberToString(twoFirstSign));

        return `${thousand} ${this.threeSignNumberToString(lastSign)}`;
    }

    private sevenSignNumberToString(num: number): string {
        const firstNum = +num.toString()[0];
        const twoFirstSign = +num.toString().slice(1, 4);
        const lastSign = +num.toString().slice(4, 7);
        const thousand = this.thouthandAdding(twoFirstSign, this.threeSignNumberToString(twoFirstSign));
        const billions = firstNum === 1
            ? 'один'
            : firstNum === 2
                ? 'два'
                : this.simpleNumberToString(firstNum);

        return `${this.billionsModify(firstNum, billions)} ${thousand} ${this.threeSignNumberToString(lastSign)}`;
    }

    private billionsModify(num: number, word: string): string {
        const lastNum = +num.toString().slice(-1);
        return lastNum === 1
            ? `${word} мільйон`
            : lastNum === 2
                ? `${word} мільйони`
                : `${word} мільйонів`;
    }
}
