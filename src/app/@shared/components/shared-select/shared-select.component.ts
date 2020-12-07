import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-shared-select',
    templateUrl: './shared-select.component.html',
    styleUrls: ['./shared-select.component.scss'],
})
export class SharedSelectComponent implements OnInit {
    @Input() label: string = '';

    constructor() {
    }

    ngOnInit() {
    }

}
