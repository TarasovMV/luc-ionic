import {Injectable} from '@angular/core';
import {AppConfigService} from '../platform/app-config.service';
import {HttpClient} from '@angular/common/http';
import {ITinderSuggestion} from '../../../models/tinder.model';

@Injectable({
    providedIn: 'root'
})
export class ApiTinderService {
    private readonly restUrl: string;

    constructor(
        appConfigService: AppConfigService,
        private http: HttpClient,
    ) {
        this.restUrl = appConfigService.recognitionUrl;
    }

    public async getNextTinder(): Promise<ITinderSuggestion> {
        return await this.http.get<ITinderSuggestion>(`${this.restUrl}/api/Tinder/next`).toPromise();
    }
}
