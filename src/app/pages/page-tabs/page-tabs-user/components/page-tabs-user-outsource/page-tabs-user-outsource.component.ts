import {Component, OnInit} from '@angular/core';
import {GoogleAuthService} from '../../../../../@core/services/outsource-auth/google-auth.service';
import {ActivatedRoute} from '@angular/router';
import {VkAuthService} from '../../../../../@core/services/outsource-auth/vk-auth.service';

@Component({
    selector: 'app-page-tabs-user-outsource',
    templateUrl: './page-tabs-user-outsource.component.html',
    styleUrls: ['./page-tabs-user-outsource.component.scss'],
})
export class PageTabsUserOutsourceComponent implements OnInit {

    constructor(
        private googleAuthService: GoogleAuthService,
        private vkAuthService: VkAuthService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.snapshotMapping();
    }

    public googleAuth(): void {
        this.googleAuthService.authRequest();
    }

    public vkAuth(): void {
        this.vkAuthService.authRequest();
        // this.vkAuthService.authRequestPlugin();
    }

    private snapshotMapping(): void {
        this.googleAuthService.getMapFromRoute(this.route.snapshot.fragment);
    }
}
