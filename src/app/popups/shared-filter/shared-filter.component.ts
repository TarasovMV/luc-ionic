import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {animate, style, transition, trigger} from '@angular/animations';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {
    ISharedFilterBrand,
    ISharedFilterColor,
    ISharedFilterMain,
    ISharedFilterPrice,
    SharedFilterTypes,
    SharedFilterUnion
} from '../../models/shared-filter.model';
import {DATA_SOURCE_MAIN} from './data/shared-filter.mock';
import {debounceTime, filter, map, shareReplay, startWith, take} from 'rxjs/operators';
import {deepCopy} from '../../@shared/functions/deep-copy.function';
import {BackButtonService} from '../../@core/services/platform/back-button.service';
import {RecognitionInfoService} from '../../@core/services/recognition-info.service';
import {FormControl} from '@angular/forms';
import {LabelType, Options} from '@angular-slider/ngx-slider';

@Component({
    selector: 'app-shared-filter',
    templateUrl: './shared-filter.component.html',
    styleUrls: ['./shared-filter.component.scss'],
    animations: [
        trigger('enterTrigger', [
            transition('void => *', [
                style({position: 'absolute', opacity: 0, transform: 'translateX(-100%)'}),
                animate('150ms', style({position: 'absolute', width: '100%', opacity: 1, transform: 'translateX(0%)'}))
            ]),
            transition('* => void', [
                style({position: 'absolute', opacity: 1}),
                animate('150ms', style({position: 'absolute', opacity: 0, transform: 'translateX(100%)'}))
            ]),
        ])
    ],
})
export class SharedFilterComponent implements OnInit {
    @Input() public searchId: number;
    @Input() public savedValue: ISharedFilterMain[] = undefined;

    public SharedFilterTypes: typeof SharedFilterTypes = SharedFilterTypes;

    public type$: BehaviorSubject<SharedFilterTypes> =
        new BehaviorSubject<SharedFilterTypes>(SharedFilterTypes.Main);

    public main$: BehaviorSubject<ISharedFilterMain[]> =
        new BehaviorSubject<ISharedFilterMain[]>([]);

    public colors$: BehaviorSubject<ISharedFilterColor[]> =
        new BehaviorSubject<ISharedFilterColor[]>([]);

    public brands$: BehaviorSubject<ISharedFilterBrand[]> =
        new BehaviorSubject<ISharedFilterBrand[]>([]);

    public prices$: BehaviorSubject<ISharedFilterPrice> =
        new BehaviorSubject<ISharedFilterPrice>(undefined);

    public searchControl: FormControl = new FormControl('');

    public filteredBrands$: Observable<ISharedFilterBrand[]> = combineLatest([
        this.brands$, this.searchControl.valueChanges.pipe(startWith(''), shareReplay(1))
    ]).pipe(map(([brands, search]) => brands.filter(b => b.label.toLowerCase().search(search) !== -1)));

    public options$: BehaviorSubject<Options> = new BehaviorSubject<Options>({
        floor: 1,
        ceil: 500,
        logScale: true,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return '<b>Min price:</b> ₽' + value;
                case LabelType.High:
                    return '<b>Max price:</b> ₽' + value;
                default:
                    return '₽' + value;
            }
        },
    });

    public minPrice$: Observable<number> = this.prices$.pipe(
        filter(x => !!x),
        map(x => x.lowerPrice),
        shareReplay(1),
    );

    public maxPrice$: Observable<number> = this.prices$.pipe(
        filter(x => !!x),
        map(x => x.higherPrice),
        shareReplay(1),
    );

    private result$ = this.main$.pipe(
        map(filter => {
            const vendor = (filter.find(x => x.type === 2).value as ISharedFilterBrand)?.label;
            const vendors = !!vendor ? [vendor] : [];
            const colors = (filter.find(x => x.type === 1).value as ISharedFilterColor[])?.map(x => x.label) ?? [];
            const priceMin = (filter.find(x => x.type === 3).value as ISharedFilterPrice)?.lowerPrice;
            const priceMax = (filter.find(x => x.type === 3).value as ISharedFilterPrice)?.higherPrice;
            return {vendors, colors, priceMin, priceMax};
        }),
        shareReplay(1),
    );

    constructor(
        private modalCtrl: ModalController,
        private backButtonService: BackButtonService,
        private recognitionService: RecognitionInfoService,
    ) {}

    ngOnInit(): void {
        this.backButtonService.actionOnBack(() => this.close(), false);
        if (!!this.savedValue) {
            this.main$.next(deepCopy(this.savedValue));
            const price = this.savedValue.find(x => x.type === SharedFilterTypes.Price);
            if (price?.value) {
                this.prices$.next({...price.value as ISharedFilterPrice});
            }
        } else {
            this.main$.next(deepCopy(DATA_SOURCE_MAIN));
        }
        this.recognitionService
            .getFilterColors(this.searchId)
            .subscribe(x => this.colors$.next(x));
        this.result$.subscribe(({vendors, colors, priceMin, priceMax}) => {
            console.log({vendors, colors, priceMin, priceMax});

            this.recognitionService
                .getFilterVendors(this.searchId, {colors, priceMin, priceMax})
                .subscribe(x => this.brands$.next(x));
            this.recognitionService
                .getFilterPrices(this.searchId, {colors, vendors})
                .pipe(filter(x => !!x?.length), map(x => x[0]))
                .subscribe(x => {
                    this.setOptions(x.lowerPrice, x.higherPrice);
                    if (!this.prices$.getValue()) {
                        this.prices$.next({...x});
                    }
                });
        });

        this.prices$.pipe(
            filter(x => !!x),
            debounceTime(500),
        ).subscribe(x => this.selectFilter(x, SharedFilterTypes.Price));
    }

    public async close(): Promise<void> {
        if (this.type$.value === SharedFilterTypes.Main) {
            await this.modalCtrl.dismiss();
        } else {
            this.type$.next(SharedFilterTypes.Main);
        }
    }

    public selectMenu(type: SharedFilterTypes) {
        setTimeout(() => this.type$.next(type), 100);
    }

    public applyFilters(): void {
        this.result$.pipe(take(1)).subscribe((res) => {
            console.log(res);
            res = {...res, init: this.main$.getValue()} as any;
            this.modalCtrl.dismiss(res).then();
        });
    }

    public clearFilter(): void {
        const main = this.main$.getValue().map(x => ({...x}));
        const type = this.type$.value;
        switch (type) {
            case SharedFilterTypes.Main:
                main.forEach(x => x.value = null);
                break;
            case SharedFilterTypes.Brand:
                main.find(x => x.type === type).value = null;
                this.close().then();
                break;
            default:
                main.find(x => x.type === type).value = null;
                break;
        }
        this.main$.next(main);
        this.prices$.next(this.mapFilterPrice(this.options$.getValue().floor, this.options$.getValue().ceil));
    }

    public selectFilter(item: SharedFilterUnion, type: SharedFilterTypes): void {
        const main = this.main$.value;
        let mainValue = main.find(x => x.type === type).value;
        switch (type) {
            case SharedFilterTypes.Brand:
                mainValue = item;
                this.close().then();
                break;
            case SharedFilterTypes.Price:
                mainValue = item;
                break;
            case SharedFilterTypes.Color:
                if (!mainValue) {
                    (mainValue as ISharedFilterPrice[]) = [item];
                } else {
                    if ((mainValue as ISharedFilterPrice[]).findIndex(x => x.id === item.id) !== -1) {
                        (mainValue as ISharedFilterPrice[]).splice(
                            (main.find(x => x.type === type).value as ISharedFilterPrice[]).findIndex(x => x.id === item.id),
                            1
                        );
                    } else {
                        (mainValue as ISharedFilterPrice[]).push(item);
                    }
                }
                break;
        }
        main.find(x => x.type === type).value = mainValue;
        this.main$.next(main);
    }

    public isActiveFilter(id: number, type: SharedFilterTypes): Observable<boolean> {
        return this.main$.pipe(
            map(x => x.find(el => el.type === type)?.value),
            map(x => {
                if (!x) {
                    return false;
                }
                switch (type) {
                    case SharedFilterTypes.Brand:
                    case SharedFilterTypes.Price:
                        return (x as ISharedFilterPrice | ISharedFilterBrand)?.id === id;
                    case SharedFilterTypes.Color:
                        return !!(x as ISharedFilterPrice[])?.find(c => c?.id === id);
                }
            }),
        );
    }

    public changePrice(type: 'min' | 'max', value: number): void {
        console.log('change', type, value);
        const price = type === 'min'
            ? this.mapFilterPrice(value, this.prices$.getValue().higherPrice)
            : this.mapFilterPrice(this.prices$.getValue().lowerPrice, value);
        this.prices$.next(price);
    }

    private setOptions(min: number, max: number): void {
        const logScale = (max - min) > 20000;
        this.options$.next({...this.options$.getValue(), floor: min || 1, ceil: max, logScale});
    }

    private mapFilterPrice = (min: number, max: number): ISharedFilterPrice => {
        return {
            id: 1,
            label: `от ${min} от ${max}`,
            lowerPrice: min,
            higherPrice: max,
        };
    }
}
