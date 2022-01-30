import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-shared-filter-search',
    templateUrl: './shared-filter-search.component.html',
    styleUrls: ['./shared-filter-search.component.scss'],
})
export class SharedFilterSearchComponent implements OnInit {
    @Input() control: FormControl = new FormControl('');

    constructor() {}

    ngOnInit(): void {}
}
