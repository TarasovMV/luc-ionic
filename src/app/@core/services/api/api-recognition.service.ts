import {Injectable} from '@angular/core';
import {AppConfigService} from '../platform/app-config.service';
import {HttpClient} from '@angular/common/http';
import {dataURLtoFile} from '../../../@shared/functions/base64-file.function';
import {IRecognitionDetected, IRecognitionDetectedObject, IRecognitionResult} from "../../../models/recognition.model";

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

    public async searchByPhoto(dataUrl: string): Promise<IRecognitionDetected> {
        const imgFile: File = dataURLtoFile(dataUrl);
        const body: FormData = new FormData();
        body.append('imageFile', imgFile, imgFile.name);
        try {
            return await this.http.post<IRecognitionDetected>(`${this.restUrl}/api/Reco`, body).toPromise();
        } catch (e) {
            console.error('searchByPhoto', e);
            return null;
        }
    }

    public async searchByDot(searchId: number, dot: IRecognitionDetectedObject): Promise<IRecognitionResult> {
        try {
            return await this.http.post<IRecognitionResult>(`${this.restUrl}/api/Reco/search/${searchId}`, dot).toPromise();
        } catch (e) {
            console.error('searchByDot', e);
            return null;
        }
    }
}
