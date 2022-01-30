import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from './platform/app-config.service';

type LogType = 'error' | 'warning' | 'info';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    constructor(
        private http: HttpClient,
        private appConfig: AppConfigService,
    ) {}

    /**
     *
     * @param severity
     * @param message
     */
    public log<T>(severity: LogType, message: string, data: T): void {
        // return;
        const prepareMessage: string = this.logMessage(message);
        switch (severity) {
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
        this.sendLogs(severity, message, data);
    }

    private logMessage = (message: string): string => {
        return message;
    }

    private async sendLogs<T>(severity: LogType, message: string, data: T): Promise<void> {
        const url = this.appConfig.userUrl;
        await this.http.post<unknown>(`${url}/logs`, {severity, message, data}).toPromise();
    }
}
