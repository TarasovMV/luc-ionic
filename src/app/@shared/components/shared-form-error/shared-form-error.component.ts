import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-shared-form-error',
    templateUrl: './shared-form-error.component.html',
    styleUrls: ['./shared-form-error.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedFormErrorComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
