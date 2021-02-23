import {Injectable} from '@angular/core';
import {AppConfigService} from '../app-config.service';
import {HttpClient} from '@angular/common/http';
import {dataURLtoFile} from '../../../@shared/functions/base64-file.function';

@Injectable({
    providedIn: 'root'
})
export class ApiRecognitionService {
    private readonly restUrl: string;

    constructor(
        appConfigService: AppConfigService,
        private http: HttpClient,
    ) {
        this.restUrl = appConfigService.recognitionUrl;
    }

    public async searchByPhoto(dataUrl: string): Promise<void> {
        const imgFile: File = dataURLtoFile(dataUrl);
        const body: FormData = new FormData();
        body.append('imageFile', imgFile, imgFile.name);
        try {
            await this.http.post<string>(`${this.restUrl}/api/Reco`, body).toPromise();
        } catch (e) {
            console.error('searchByPhoto', e);
        }
    }
}
