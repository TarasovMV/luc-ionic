import {Component, OnDestroy, OnInit} from '@angular/core';
import { RxJsUnsubscriber } from '../../../../../@core/abstractions/RxJsUnsubscriber';
import {UserInfoService} from '../../../../../@core/services/user-info.service';
import {takeUntil} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-page-tabs-user-screen-auth',
    templateUrl: './page-tabs-user-screen-auth.component.html',
    styleUrls: ['./page-tabs-user-screen-auth.component.scss'],
})
export class PageTabsUserScreenAuthComponent extends RxJsUnsubscriber implements OnInit, OnDestroy {
    public userForm: FormGroup;

    constructor(private userService: UserInfoService) {
        super();
    }

    ngOnInit(): void {
        this.userService.authUser$.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            this.userForm = new FormGroup({
                gender: new FormControl(),
                city: new FormControl(),
            });
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

}
