import {Injectable} from '@angular/core';

type LogType = 'error' | 'warning' | 'info';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    constructor() {
    }

    /**
     *
     * @param type
     * @param message
     */
    log(type: LogType, message: string): void {
        const prepareMessage: string = this.logMessage(message);
        switch (type) {
            case 'error':
                console.error(prepareMessage);
                break;
            case 'warning':
                console.warn(prepareMessage);
                break;
            case 'info':
                console.log(prepareMessage);
                break;
        }
    }

    private logMessage = (message: string): string => {
        return message;
    }
}
