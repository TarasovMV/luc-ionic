import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppTokenService {
    private userToken$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    set userToken(value: string) {
        this.userToken$.next(value);
    }
    get userToken(): string {
        return this.userToken$.getValue();
    }

    constructor() {
    }
}
