import {Component, OnInit} from '@angular/core';
import {GoogleAuthService} from '../../../../../@core/services/outsource-auth/google-auth.service';
import {ActivatedRoute} from '@angular/router';
import {VkAuthService} from '../../../../../@core/services/outsource-auth/vk-auth.service';
import {ApiUserService} from '../../../../../@core/services/api/api-user.service';
import {UserInfoService} from '../../../../../@core/services/user-info.service';

@Component({
    selector: 'app-page-tabs-user-outsource',
    templateUrl: './page-tabs-user-outsource.component.html',
    styleUrls: ['./page-tabs-user-outsource.component.scss'],
})
export class PageTabsUserOutsourceComponent implements OnInit {

    constructor(
        private userService: UserInfoService,
        private apiUserService: ApiUserService,
        private googleAuthService: GoogleAuthService,
        private vkAuthService: VkAuthService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.snapshotMapping();
    }

    public async googleAuth(): Promise<void> {
        const googleData = await this.googleAuthService.authRequest();
        if (!googleData?.googleOAuthToken || !googleData?.email) {
            return;
        }
        const user = await this.apiUserService.userGoogle(googleData);
        this.userService.setUser(user);
    }

    public vkAuth(): void {
        // this.vkAuthService.authRequest();
        this.vkAuthService.authRequestPlugin().then();
    }

    private snapshotMapping(): void {
        this.googleAuthService.getMapFromRoute(this.route.snapshot.fragment);
    }
}
