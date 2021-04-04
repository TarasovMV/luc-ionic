import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

export interface ISelectModel<T> {
    value: T;
    title: string;
}

@Component({
    selector: 'app-shared-select',
    templateUrl: './shared-select.component.html',
    styleUrls: ['./shared-select.component.scss'],
})
export class SharedSelectComponent implements OnInit {
    @Input() label: string = '';
    @Input() formControl: AbstractControl;
    @Input() values: ISelectModel<unknown>[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

}
