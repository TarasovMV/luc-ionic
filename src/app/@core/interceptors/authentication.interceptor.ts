import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppTokenService} from '../services/app-token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private tokenService: AppTokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            url: encodeURI(req.url),
            headers: req.headers.append('Authorization', `Bearer ${this.tokenService.userToken}`),
        });
        return next.handle(req);
    }
}
