import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'app-page-user-init-round-button',
    templateUrl: './page-user-init-round-button.component.html',
    styleUrls: ['./page-user-init-round-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageUserInitRoundButtonComponent {

    @Input() label: string = '-';

    constructor() {
    }
}
