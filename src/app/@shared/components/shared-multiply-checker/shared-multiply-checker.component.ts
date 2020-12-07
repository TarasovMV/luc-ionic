import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-shared-multiply-checker',
    templateUrl: './shared-multiply-checker.component.html',
    styleUrls: ['./shared-multiply-checker.component.scss'],
})
export class SharedMultiplyCheckerComponent implements OnInit {
    @Input() isActive: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }

}
