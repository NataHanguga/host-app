export interface TableData<T> {
    items: T[];
    headers: string[];
    docHeader: string;
    docFooter: string;
    docCenterHeader: string;
    fieldsOrder: string[];
    sumFields: string[];
    sumRow: any[];
}
