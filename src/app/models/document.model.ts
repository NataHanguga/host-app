import { AlignmentType, Document, PageOrientation, Paragraph, Table, TableCell, TableRow, VerticalAlign } from 'docx';
import { TarifTeacher, TarifTeacherData } from './tarif-teacher-data.model';

export class DocumentCreation {
    constructor(private data: TarifTeacherData) { }

    public create(): Document {
        const document = new Document({
            creator: 'Dolan Miu',
            description: 'My extremely interesting document',
            title: 'My Document',
        });

        document.addSection({
            margins: { left: 500, right: 500, top: 500, bottom: 500 },
            size: { orientation: PageOrientation.LANDSCAPE },
            children: [
                ...this.setRightAlignParagraphs(this.data.docHeader.length ? this.data.docHeader.split('\n') : []),
                ...this.setCenterAlignParagraph(this.data.docCenterHeader.split('\n')),
                new Paragraph(''),
                this.addTable()
            ],
        });

        return document;
    }

    private setRightAlignParagraphs(header: string[]): Paragraph[] {
        return header.map((str: string) => new Paragraph({ text: str, alignment: AlignmentType.RIGHT }));
    }

    private setCenterAlignParagraph(text: string[]): Paragraph[] {
        return text.map((str: string) => new Paragraph({ text: str, alignment: AlignmentType.CENTER }));
    }

    private addTable(): Table {
        const numberedArr: string[] = this.data.headers.map((str: string) => `${this.data.headers.indexOf(str) + 1}`);

        return new Table({
            alignment: AlignmentType.CENTER,
            rows: [
                new TableRow({
                    children: [...this.addTableHeader(this.data.headers)],
                    tableHeader: true,
                    cantSplit: false
                }),
                new TableRow({
                    children: [...this.addTableHeader(numberedArr)],
                    tableHeader: true
                }),
                ...this.addTableBody(),
                new TableRow({
                    children: [...this.data.sumRow.map((sum: any) => this.tableDataArray(sum))],
                })
            ]
        });
    }

    private addTableHeader(headers: string[]): TableCell[] {
        return headers.map((str: string) => this.tableDataArray(str));
    }

    private tableDataArray(item: string): TableCell {
        return new TableCell({
            children: [new Paragraph(item)],
            margins: { top: 100, right: 100, bottom: 100, left: 100 },
            verticalAlign: VerticalAlign.CENTER
        });
    }

    private addTableBody(): TableRow[] {
        return this.data.items.map((item: TarifTeacher) => new TableRow({
            children: [
                this.tableDataArray(`${this.data.items.indexOf(item) + 1}`),
                ...this.data.fieldsOrder.map((field: string) => this.tableDataArray(`${item[field]}`))
            ]
        })
        );
    }
}
