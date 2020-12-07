import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-page-tabs-user-screen-reg',
    templateUrl: './page-tabs-user-screen-reg.component.html',
    styleUrls: ['./page-tabs-user-screen-reg.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsUserScreenRegComponent implements OnInit {

    public isPersonalDataAgree$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
    }

    ngOnInit(): void {
    }

    public agreeClick(): void {
        this.isPersonalDataAgree$.next(
            !this.isPersonalDataAgree$.getValue()
        );
    }
}
