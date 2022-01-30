import {Injectable} from '@angular/core';
import {AppConfigService} from '../platform/app-config.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {dataURLtoFile} from '../../../@shared/functions/base64-file.function';
import {IRecognitionDetected, IRecognitionDetectedObject, IRecognitionResult, IStartScreenReco} from '../../../models/recognition.model';
import {IProductModel, IProductPreviewModel} from '../../../models/page-product.model';
import {UserInfoGender} from '../../../models/user-info.model';
import {Observable} from 'rxjs';
import {ISharedFilterPriceDto} from '../../../models/shared-filter.model';
import {IPageScanProductModel} from '../../../models/page-scan.model';

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
            const url = `${this.restUrl}/api/Reco/feed/${id}`;
            return await this.http.get<IProductModel>(`${this.restUrl}/api/Reco/feed/${id}`).toPromise();
        } catch (e) {
            console.error('getFullItem', e);
            return null;
        }
    }

    public getFilterColors(searchId: number): Observable<string[]> {
        let params = new HttpParams();
        if (!!searchId) {
            params = params.set('photoSearchId', searchId.toString());
        }
        return this.http.get<string[]>(`${this.restUrl}/api/reference/colors`, {params});
    }

    public getFilterVendors(searchId: number, options?: {
        colors?: string[], priceMin?: number, priceMax?: number
    }): Observable<string[]> {
        // let params = new HttpParams();
        let params: string = '?';
        if (!!searchId) {
            // params = params.set('photoSearchId', searchId.toString());
            params += `photoSearchId=${searchId}`;
        }
        if (!!options?.colors?.length) {
            // params = params.set('colors', options.colors.join('&'));
            params += options.colors.map(x => `&colors=${x}`).join('');
        }
        if (!!options?.priceMin) {
            // params = params.set('Price.Min', options?.priceMin.toString());
            params += `&Price.Min=${options.priceMin}`;
        }
        if (!!options?.priceMax) {
            params += `&Price.Max=${options.priceMax}`;
            // params = params.set('Price.Max', options?.priceMax.toString());
        }
        // return this.http.get<string[]>(`${this.restUrl}/api/reference/vendors`, {params});
        return this.http.get<string[]>(`${this.restUrl}/api/reference/vendors${params}`);
    }

    public getFilterPrices(searchId: number, options?: {
        colors?: string[], vendors: string[]
    }): Observable<ISharedFilterPriceDto> {
        // let params = new HttpParams();
        let params: string = '?';
        if (!!searchId) {
            // params = params.set('photoSearchId', searchId.toString());
            params += `photoSearchId=${searchId}`;
        }
        if (!!options?.colors?.length) {
            // params = params.set('colors', options?.colors.join(('&')));
            params += options.colors.map(x => `&colors=${x}`).join('');
        }
        if (!!options?.vendors?.length) {
            // params = params.set('Vendors', options?.vendors.join('&'));
            params += options.vendors.map(x => `&Vendors=${x}`).join('');
        }
        console.log(params);
        return this.http.get<ISharedFilterPriceDto>(`${this.restUrl}/api/reference/prices${params}`);
    }

    public searchByFilter(searchId: number, options: any): Observable<IPageScanProductModel[]> {
        let params: string = '';
        console.log('options', options);
        if (!!options?.colors?.length) {
            params += options.colors.map(x => `colors=${x}&`).join('');
        }
        if (!!options?.vendors?.length) {
            params += options.vendors.map(x => `Vendors=${x}&`).join('');
        }
        if (!!options?.priceMin) {
            params += `Price.Min=${options.priceMin}&`;
        }
        if (!!options?.priceMax) {
            params += `Price.Max=${options.priceMax}`;
        }
        return this.http.get<IPageScanProductModel[]>(`${this.restUrl}/api/Reco/search/${searchId}?${params}`);
    }
}
