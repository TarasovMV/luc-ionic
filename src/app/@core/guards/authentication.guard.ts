import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AppTokenService} from '../services/app-token.service';
import {NavController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private tokenService: AppTokenService,
        private navCtrl: NavController,
    ) {}

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        // return true;
        if (this.tokenService.userToken) {
            this.navCtrl.navigateRoot('/main').then();
            return false;
        } else {
            return true;
        }
    }
}
