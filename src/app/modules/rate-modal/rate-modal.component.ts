import { Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Rate } from 'src/app/models/rate.model';

@Component({
    templateUrl: './rate-modal.component.html',
    styleUrls: ['./rate-modal.component.scss']
})
export class RateModalComponent {
    @Input() rate: Rate = null;

    constructor(private modal: NzModalRef) { }

    close(rate?: Rate): void {
        this.modal.destroy(rate);
    }

    save(): void {
        this.close(this.rate);
    }
}
