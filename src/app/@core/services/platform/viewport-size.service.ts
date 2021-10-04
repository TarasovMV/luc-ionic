import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ViewportSizeService {

    constructor() {
    }

    public init(): void {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        window.addEventListener('resize', () => {
            vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }
}
