import {Injectable} from '@angular/core';
import {IRecognitionResult, IRecognitionTextResult, IStartScreenReco} from '../../models/recognition.model';
import {IProductModel, IProductPreviewModel} from '../../models/page-product.model';
import {UserInfoService} from './user-info.service';
import {ApiRecognitionService} from './api/api-recognition.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {TinderSuggestionType} from '../../models/tinder.model';
import {AppConfigService} from './platform/app-config.service';
import {ISharedFilterBrand, ISharedFilterColor, ISharedFilterPrice} from '../../models/shared-filter.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RecognitionInfoService {
    public recommendCards$: BehaviorSubject<IProductPreviewModel[]> =
        new BehaviorSubject<IProductPreviewModel[]>([null, null, null]);
    public recognitionSaveFunction: () => Promise<IRecognitionResult>;
    public recognitionFeedFunction: () => Promise<IProductModel>;

    private cache: {[key: string]: unknown} = {};
    private readonly restUrl: string;

    constructor(
        private userInfoService: UserInfoService,
        private apiRecognitionService: ApiRecognitionService,
        configService: AppConfigService,
    ) {
        this.restUrl = configService.recognitionUrl;
    }

    public textResultMapper(result: IRecognitionTextResult): IRecognitionResult {
        return {
            searchId: result?.id,
            previews: result?.searchResults ?? [],
        };
    }

    public async getStartReco(): Promise<IStartScreenReco[]> {
        const gender = await this.userInfoService.getInitialGender();
        return await this.apiRecognitionService.getStartScreenReco(gender);
    }

    public async getMainRecommends(force: boolean = false): Promise<void> {
        if (this.isMainRecommendsLoaded() && !force) {
            return;
        }
        const res = await this.apiRecognitionService.getMainRecommends();
        this.recommendCards$.next(res);
    }

    public isMainRecommendsLoaded(): boolean {
        return !this.recommendCards$.getValue().every(x => x === null);
    }

    public imgHandlerUrl(type: TinderSuggestionType, id: number): string {
        // return "http://194.67.203.143:5679/api/Photo/feed/762548";
        if (type === 'feed') {
            return `${this.restUrl}/api/Photo/feed/${id}`;
        }
        return `${this.restUrl}/api/Photo/tinder/${id}`;
    }

    public getFilterColors(searchId: number): Observable<ISharedFilterColor[]> {
        const cacheKey = `filterColor_${searchId}`;
        if (!!this.cache[cacheKey]) {
            return of(this.cache[cacheKey] as ISharedFilterColor[]);
        }
        return this.apiRecognitionService.getFilterColors(searchId).pipe(
            map(x => x.map((c, idx) => ({
                id: idx + 1,
                color: c,
                label: c,
                count: undefined,
            }))),
            tap(x => this.cache[cacheKey] = x)
        );
    }

    public getFilterVendors(searchId: number, options?: {
        colors?: string[], priceMin?: number, priceMax?: number
    }): Observable<ISharedFilterBrand[]> {
        const cacheKey = this.cacheKey(options, `filterVendors_${searchId}`);
        if (!!this.cache[cacheKey]) {
            return of(this.cache[cacheKey] as ISharedFilterBrand[]);
        }
        return this.apiRecognitionService.getFilterVendors(searchId, options).pipe(
            map(x => x.map((v, idx) => ({
                id: idx + 1,
                label: v,
            }))),
            tap(x => this.cache[cacheKey] = x)
        );
    }

    public getFilterPrices(searchId: number, options?: {
        colors?: string[], vendors: string[],
    }): Observable<ISharedFilterPrice[]> {
        const cacheKey = this.cacheKey(options, `filterPrices_${searchId}`);
        if (!!this.cache[cacheKey]) {
            return of(this.cache[cacheKey] as ISharedFilterPrice[]);
        }
        return this.apiRecognitionService.getFilterPrices(searchId, options).pipe(
            map(x => ([{
                id: 1,
                label: `от ${x.min} до ${x.max}`,
                higherPrice: x.max,
                lowerPrice: x.min,
            }])),
            tap(x => this.cache[cacheKey] = x)
        );
    }

    private releaseCache(): void {
        this.cache = {};
    }

    private cacheKey = (options: {[key: string]: number | string | string[]}, init: string) => Object
        .entries(options ?? {})
        .reduce((acc, next) =>
            !!next[1] ? acc += `_${next[0]}:${Array.isArray(next[1]) ? next[1].join('&') : next[1]}` : acc,
            init
        )
}
