import { Component } from '@angular/core';

@Component({
    selector: 'app-position',
    templateUrl: './position.component.html',
    styleUrls: ['./position.component.scss'],
})
export class PositionComponent {
    selectedTab = 0;
    private readonly key = 'position-tab';

    constructor() {
        this.selectedTab = +localStorage.getItem(this.key);
    }

    saveTabIndexToLS(): void {
        localStorage.setItem(this.key, JSON.stringify(this.selectedTab));
    }
}
