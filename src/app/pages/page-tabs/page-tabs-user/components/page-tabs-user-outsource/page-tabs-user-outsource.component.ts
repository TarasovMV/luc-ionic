import {Component, OnInit} from '@angular/core';
import {GoogleAuthService} from '../../../../../@core/services/outsource-auth/google-auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-page-tabs-user-outsource',
    templateUrl: './page-tabs-user-outsource.component.html',
    styleUrls: ['./page-tabs-user-outsource.component.scss'],
})
export class PageTabsUserOutsourceComponent implements OnInit {

    constructor(private googleAuthService: GoogleAuthService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.snapshotMapping();
    }

    public googleAuth(): void {
        this.googleAuthService.authRequest();
    }

    private snapshotMapping(): void {
        this.googleAuthService.getMapFromRoute(this.route.snapshot.fragment);
    }
}
