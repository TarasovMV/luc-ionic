import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class AppTokenService {
    private readonly userAuthTokenPath: string = 'user-token';
    private readonly userAuthAnonTokenPath: string = 'user-token-anon';

    private userAuthAnonToken: string = null;
    private userToken$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    set userTokenAuth(value: string) {
        this.saveToken(value, this.userAuthTokenPath);
        this.userToken$.next(value);
    }

    set userToken(value: string) {
        if (!value) {
            this.clear();
            return;
        }
        let path = this.userAuthTokenPath;
        if ((!this.userAuthAnonToken && !this.userToken$.getValue()) || this.userToken$.getValue() === this.userAuthAnonToken) {
            this.userAuthAnonToken = value;
            path = this.userAuthAnonTokenPath;
        }
        this.saveToken(value, path);
        this.userToken$.next(value);
    }

    get userToken(): string {
        return this.userToken$.getValue();
    }

    constructor(private storage: Storage) {}

    public debugClear(): void {
        this.storage.set(this.userAuthTokenPath, null).then();
        this.storage.set(this.userAuthAnonTokenPath, null).then();
    }

    private clear(): void {
        this.storage.set(this.userAuthTokenPath, null).then();
        this.userToken$.next(this.userAuthAnonToken);
    }

    private saveToken(token: string, path: string): void {
        this.storage.set(path, token).then();
    }

    public async loadToken(): Promise<void> {
        const anonToken = await this.storage.get(this.userAuthAnonTokenPath);
        const token = await this.storage.get(this.userAuthTokenPath);
        this.userAuthAnonToken = anonToken;
        this.userToken$.next(token || anonToken);
    }
}
