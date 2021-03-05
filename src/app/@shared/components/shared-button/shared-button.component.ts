import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-shared-button',
    templateUrl: './shared-button.component.html',
    styleUrls: ['./shared-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedButtonComponent implements OnInit {

    @Input() type: 'main' | 'main-sub' | 'skeleton' | 'alternative' = 'main';

    constructor() {
    }

    ngOnInit() {
    }
}
