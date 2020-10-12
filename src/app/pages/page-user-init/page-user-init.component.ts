import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-page-user-init',
    templateUrl: './page-user-init.component.html',
    styleUrls: ['./page-user-init.component.scss'],
})
export class PageUserInitComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    public async chooseCategory(gender: 'male' | 'female'): Promise<void> {
        await this.router.navigateByUrl('/main');
    }
}
