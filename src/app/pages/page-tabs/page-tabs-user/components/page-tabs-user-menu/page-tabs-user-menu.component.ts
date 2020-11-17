import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-page-tabs-user-menu',
    templateUrl: './page-tabs-user-menu.component.html',
    styleUrls: ['./page-tabs-user-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsUserMenuComponent implements OnInit {

    @Input() icon: 'star' | 'crowd' | 'fire' = 'star';

    constructor() {
    }

    ngOnInit(): void {
    }

}
