import {Component, Input, OnInit} from '@angular/core';
import {IPagePreviewCard} from '../../../models/page-preview.model';

@Component({
    selector: 'app-page-preview-pager',
    templateUrl: './page-preview-pager.component.html',
    styleUrls: ['./page-preview-pager.component.scss'],
})
export class PagePreviewPagerComponent implements OnInit {

    @Input() data: IPagePreviewCard[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

}
