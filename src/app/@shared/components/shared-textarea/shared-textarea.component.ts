import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-shared-textarea',
    templateUrl: './shared-textarea.component.html',
    styleUrls: ['./shared-textarea.component.scss'],
})
export class SharedTextareaComponent implements OnInit {
    @Input() label: string = '';
    @Input() formControl: FormControl;

    constructor() {
    }

    ngOnInit() {
    }

}
