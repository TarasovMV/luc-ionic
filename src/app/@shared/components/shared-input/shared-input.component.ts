import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InputType} from '../../models/shared-input.model';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-shared-input',
    templateUrl: './shared-input.component.html',
    styleUrls: ['./shared-input.component.scss'],
})
export class SharedInputComponent implements OnInit {

    @Input() formControl: FormControl;

    @Input() value = '';
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

    @Input() label = '';
    @Input() type: InputType = 'text';

    constructor() {
    }

    ngOnInit() {
    }

}
