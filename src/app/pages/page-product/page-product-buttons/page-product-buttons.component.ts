import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-page-product-buttons',
    templateUrl: './page-product-buttons.component.html',
    styleUrls: ['./page-product-buttons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageProductButtonsComponent implements OnInit {

    @Input() shopUrl: string = null;

    constructor() {
    }

    public ngOnInit(): void {
    }

}
