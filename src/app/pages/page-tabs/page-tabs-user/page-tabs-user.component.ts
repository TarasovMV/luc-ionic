import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PageTypeAuthenticate} from '../../../models/page-tabs-login.model';
import {SharedFilterComponent} from "../../../popups/shared-filter/shared-filter.component";
import {ModalController} from "@ionic/angular";

@Component({
    selector: 'app-page-tabs-user',
    templateUrl: './page-tabs-user.component.html',
    styleUrls: ['./page-tabs-user.component.scss'],
})
export class PageTabsUserComponent implements OnInit {

    public pageType$: BehaviorSubject<PageTypeAuthenticate> = new BehaviorSubject<PageTypeAuthenticate>('reg');

    constructor() {}

    ngOnInit(): void {
    }

    public switchPage(type: PageTypeAuthenticate) {
        if (this.pageType$.getValue() === type) {
            return;
        }
        this.pageType$.next(type);
    }
}
