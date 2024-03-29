import {Injectable} from '@angular/core';
import {AppConfigService} from '../platform/app-config.service';
import {HttpClient} from '@angular/common/http';
import {dataURLtoFile} from '../../../@shared/functions/base64-file.function';
import {IRecognitionDetected, IRecognitionDetectedObject, IRecognitionResult, IStartScreenReco} from '../../../models/recognition.model';
import {IProductModel, IProductPreviewModel} from '../../../models/page-product.model';
import {UserInfoGender} from '../../../models/user-info.model';

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

    public async getMainRecommends(): Promise<IProductPreviewModel[]> {
        try {
            const url: string = `${this.restUrl}/api/MainScreen/feeds`;
            return await this.http.get<IProductPreviewModel[]>(url).toPromise();
        } catch (e) {
            console.error('getMainRecommends', e);
            return [];
        }
    }

    public async getStartScreenReco(gender: UserInfoGender): Promise<IStartScreenReco[]> {
        try {
            return await this.http.get<IStartScreenReco[]>(`${this.restUrl}/api/StartScreenReco?gender=${gender}`).toPromise();
        } catch (e) {
            console.error('getStartScreenReco', e);
            return [];
        }
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

    public async searchByText(search: string): Promise<any> {
        try {
            return await this.http.get<IRecognitionResult>(`${this.restUrl}/api/Text?query=${search}`).toPromise();
        } catch (e) {
            console.error('searchByText', e);
            return null;
        }
    }

    public async getFullItem(id: number): Promise<IProductModel> {
        try {
            const url = `${this.restUrl} /api/Reco/feed/${id}`;
            return await this.http.get<IProductModel>(`${this.restUrl}/api/Reco/feed/${id}`).toPromise();
        } catch (e) {
            console.error('getFullItem', e);
            return null;
        }
    }
}
