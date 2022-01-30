import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AppTokenService} from '../services/app-token.service';
import {LoggerService} from '../services/logger.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private tokenService: AppTokenService,
        private logger: LoggerService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((e) => {
                switch (e.status) {
                    case 475:
                        const token = e?.error?.token;
                        if (token) {
                            this.tokenService.userToken = token;
                            return next.handle(req);
                        }
                        console.error('Error 475 (continue): Token was not received');
                        break;
                    case 500:
                        this.logger.log('error', 'api error', e);
                        break;
                    default:
                        break;
                }
                return throwError(e);
            })
        );
    }
}
