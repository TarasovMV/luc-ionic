import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageTypeAuthenticate} from '../../../../../models/page-tabs-login.model';

@Component({
    selector: 'app-page-tabs-user-regbutton',
    templateUrl: './page-tabs-user-regbutton.component.html',
    styleUrls: ['./page-tabs-user-regbutton.component.scss'],
})
export class PageTabsUserRegbuttonComponent implements OnInit {

    @Input() pageType: PageTypeAuthenticate;
    @Output() changePage: EventEmitter<PageTypeAuthenticate> = new EventEmitter<PageTypeAuthenticate>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public buttonClick(type: PageTypeAuthenticate): void {
        this.changePage.emit(type);
    }
}
