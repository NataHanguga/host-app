import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';


@NgModule({
    imports: [ NgZorroAntdModule, CommonModule, FormsModule, ReactiveFormsModule, NzTabsModule ],
    exports: [ NgZorroAntdModule, CommonModule, FormsModule, ReactiveFormsModule, NzTabsModule],
})
export class SharedModule {}
