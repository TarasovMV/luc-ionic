import {Component, Input, OnInit} from '@angular/core';
import {InputType} from '../../models/shared-input.model';

@Component({
    selector: 'app-shared-input',
    templateUrl: './shared-input.component.html',
    styleUrls: ['./shared-input.component.scss'],
})
export class SharedInputComponent implements OnInit {

    @Input() label = '';
    @Input() type: InputType = 'text';

    constructor() {
    }

    ngOnInit() {
    }

}
