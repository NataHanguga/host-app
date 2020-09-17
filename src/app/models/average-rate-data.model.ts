import { Teacher } from './teacher.model';
import { TableData } from './table-data.interface';



export class AverageRateData implements TableData<AverageRateTeacher> {
    public items: AverageRateTeacher[] = [];
    public headers: string[] = [
        '№',
        'Прізвище, імя та по батькові',
        'Викл',
        'Конц',
        'Всього',
        'Обсяг педагогічного навантаження (фактична кількість педагогічних годн)',
        'Тарифна ставка з урахуваням підвищень',
        'Зарплата',
        'Разом (зарплата+надбавки)',
        '20%',
        'Всього',
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
        'teachHours',
        'concertHours',
        'totalHours',
        'pedVolume',
        'tarifRate',
        'arMoney',
        'moneyAndAdding',
        'twentyPercents',
        'total'
    ];
    public sumFields: string[] = [
        'totalHours',
        'pedVolume',
        'tarifRate',
        'arMoney',
        'moneyAndAdding',
        'twentyPercents',
        'total'
    ];
    public sumRow = [];

    constructor(public teachers: Teacher[]) {
        this.items = this.setItems(teachers as AverageRateTeacher[]);
        this.sumRow = this.fieldsOrder.map((field: string) => {
            if (this.sumFields.includes(field)) {
                return +(this.items.reduce((sum, item: AverageRateTeacher) => sum + item[field], 0)).toFixed(2);
            } else {
                return '';
            }
        });
        this.sumRow.unshift('Всього:');
    }

    private setItems(teachers: AverageRateTeacher[]): AverageRateTeacher[] {
        return teachers
            .map(this.setTarificalTableTeacherData)
            .sort((a: AverageRateTeacher, b: AverageRateTeacher) => b.rate - a.rate);
    }

    private setTarificalTableTeacherData = (teacher: AverageRateTeacher): AverageRateTeacher => {
        teacher.totalHours = teacher.teachHours + teacher.concertHours;
        teacher.pedVolume = +(teacher.totalHours / 18).toFixed(4);
        teacher.tarifRate = +(teacher.increase + teacher.money).toFixed(2);
        teacher.arMoney = +(teacher.tarifRate * teacher.pedVolume).toFixed(2);
        teacher.twentyPercents = +(teacher.arMoney * 0.2).toFixed(2);
        return teacher;
    }
}

export class AverageRateTeacher extends Teacher {
    public totalHours: number;
    public pedVolume: number;
    public tarifRate: number;
    public arMoney: number;
    public moneyAndAdding: number;
    public twentyPercents: number;
    public total: number;

}
