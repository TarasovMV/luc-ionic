import {Injectable} from '@angular/core';
import {AppConfigService} from '../platform/app-config.service';

@Injectable({
    providedIn: 'root'
})
export class ApiFileService {
    private readonly restUrl: string;

    constructor(appConfigService: AppConfigService) {
        this.restUrl = appConfigService.fileUrl;
    }

    public getStartRecoPhotoById(id: number): string {
        return `${this.restUrl}/api/Photo/start-screen-reco/${id}`;
    }

    public getTinderPhotoById(id: number): string {
        return `${this.restUrl}/api/Photo/tinder/${id}`;
    }

    public getArticlePhoto(url: string): string {
        url = url.replace('/', '%2F');
        return `${this.restUrl}/api/Photo/${url}`;
    }
}
