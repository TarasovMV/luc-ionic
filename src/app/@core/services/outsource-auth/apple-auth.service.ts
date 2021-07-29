import {Injectable} from '@angular/core';
// import {SignInWithApple, SignInWithAppleOptions, SignInWithAppleResponse} from '@capacitor-community/apple-sign-in';

@Injectable({
    providedIn: 'root'
})
export class AppleAuthService {

    // public readonly options: SignInWithAppleOptions = {
    //     clientId: 'com.luc.app',
    //     redirectURI: 'http://www.luc.fashion',
    //     scopes: 'email name',
    //     // state: '12345',
    //     // nonce: 'nonce',
    // };
    //
    // constructor() {}
    //
    // public async auth(): Promise<SignInWithAppleResponse> {
    //     try {
    //         return await SignInWithApple.authorize(this.options);
    //     } catch (e) {
    //         console.error('Apple auth error!', e);
    //         return null;
    //     }
    // }
}
