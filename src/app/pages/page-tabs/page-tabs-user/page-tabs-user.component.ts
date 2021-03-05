import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {PageTypeAuthenticate} from '../../../models/page-tabs-login.model';
import {UserInfoService} from '../../../@core/services/user-info.service';
import {RxJsUnsubscriber} from '../../../@core/abstractions/RxJsUnsubscriber';
import {takeUntil} from 'rxjs/operators';
import {IUserInfo} from '../../../models/user-info.model';
import {IPageTab, PageTabType} from '../../../models/page-tab.model';

@Component({
    selector: 'app-page-tabs-user',
    templateUrl: './page-tabs-user.component.html',
    styleUrls: ['./page-tabs-user.component.scss'],
})
export class PageTabsUserComponent extends RxJsUnsubscriber implements OnInit, OnDestroy, IPageTab {
    readonly tabName: PageTabType = 'user';

    public userInfo$: Observable<IUserInfo> = this.userService.authUser$.asObservable();
    public pageType$: BehaviorSubject<PageTypeAuthenticate> = new BehaviorSubject<PageTypeAuthenticate>('auth');

    constructor(private userService: UserInfoService) {
        super();
    }

    ngOnInit(): void {
        this.autoPageTypeChanger();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    public exitAccount(): void {
        this.userService.clearUser();
    }

    public switchPage(type: PageTypeAuthenticate) {
        if (this.pageType$.getValue() === type) {
            return;
        }
        this.pageType$.next(type);
    }

    private autoPageTypeChanger(): void {
        this.userService.authUser$.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            if (x) {
                this.pageType$.next('auth');
            } else {
                this.pageType$.next('login');
            }
        });
    }
}
