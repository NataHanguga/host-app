import { PedagogicTitle } from './pedagogic-title.model';
import { Rate } from './rate.model';
import { TableData } from './table-data.interface';
import { Teacher } from './teacher.model';

export class TarifTeacherData implements TableData<TarifTeacher> {
    public items: TarifTeacher[] = [];
    public headers: string[] = [
        '№',
        'Прізвище, імя та по батькові',
        'Освіта (без освіти, вища І-ІІ р.а., ІІІ-IV  р.а.)',
        'Посада, Категорія, Рік прохоження атестації',
        'Розряд ЄТС',
        'Тарифна ставка (за ЄТС)',
        'Педагогічне звання',
        'Розмір підвищень (грн..)',
        'Місячний тариф з урахуванням підвищень',
        'Стаж роботи,що дає правона надбавку за вислугу років',
        '%',
        'Розмір надбавки за вислугу років (грн..)',
        '20%',
        'Місячний тариф з урахуванням підвищень та надбавок',
    ];
    public docCenterHeader = `
    ТАРИФІКАЦІЙНИЙ СПИСОК\n
    педагогічних працівників\n
    Новомиргородська дитяча школа мистецтв\n
    (назва спеціалізованого мистецького навчального закладу)`;

    public docHeader = `
    Начальник відділу культури,\n
    туризму та культурної спадщини\n
    райдержадміністрації\n
    МП _____________      підпис\n«__»__________ 20___ р. `;
    public docFooter = null;
    public fieldsOrder: string[] = [
        'name',
        'education',
        'titleAndYear',
        'rate',
        'money',
        'pedagogicalTitle',
        'increaseSize',
        'monthTarifAndIncrease',
        'expirience',
        'expiriencePercent',
        'yearsServiceAdding',
        'twentyPercents',
        'total'
    ];
    public sumFields: string[] = ['monthTarifAndIncrease', 'yearsServiceAdding', 'twentyPercents', 'total'];
    public sumRow = [];
    constructor(public teachers: Teacher[]) {
        // this.items = this.setItems(teachers as TarifTeacher[]);
        // this.sumRow = this.fieldsOrder.map((field: string) => {
        //     if (this.sumFields.includes(field)) {
        //         return +(this.items.reduce((sum, item: TarifTeacher) => sum + item[field], 0)).toFixed(2);
        //     } else {
        //         return '';
        //     }
        // });
        // this.sumRow.unshift('Всього:');
    }

    private setItems(teachers: TarifTeacher[]): TarifTeacher[] {
        return teachers
            .map(this.setTarificalTableTeacherData);
            // .sort((a: TarifTeacher, b: TarifTeacher) => b.rate - a.rate);
    }

    private setTarificalTableTeacherData = (teacher: TarifTeacher) => {
        teacher.monthTarifAndIncrease = +(teacher.increase + teacher.money).toFixed(2);
        teacher.expiriencePercent = this.setExpiriencePercent(teacher.expirience);
        teacher.yearsServiceAdding = +((teacher.monthTarifAndIncrease * teacher.expiriencePercent) / 100).toFixed(2);
        teacher.twentyPercents = +(teacher.monthTarifAndIncrease * 0.2).toFixed(2);
        teacher.total =
            +(teacher.monthTarifAndIncrease +
            teacher.yearsServiceAdding +
            teacher.twentyPercents).toFixed(2);

        return teacher as TarifTeacher;
    }

    private setExpiriencePercent(expirience: number): number {
        return expirience < 3
            ? 0
            : expirience <= 9
                ? 10
                : expirience <= 19
                    ? 20
                    : 30;
    }
}

export class TarifTeacher extends Teacher {
    public monthTarifAndIncrease = 0;
    public expiriencePercent = 10;
    public yearsServiceAdding = 0; // висслуга років
    public twentyPercents = 0;
    public total = 0;
    public pedagogicTitle?: PedagogicTitle;
    public name: string;
    public year: number;
    public id: string;
    public expirience: number;
    public education: string;
    public rate: Rate;
    public money: number;
    public title?: string;

    get titleAndYear(): string {
        return `${this.title} ${this.year}`;
    }

    get pedagogicalTitle(): string {
        return this.pedagogicTitle ? this.pedagogicTitle.label : '';
    }
}
