import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {animate, style, transition, trigger} from '@angular/animations';
import {BehaviorSubject, Observable} from 'rxjs';
import {
    ISharedFilterBrand,
    ISharedFilterColor,
    ISharedFilterMain,
    ISharedFilterPrice,
    SharedFilterTypes,
    SharedFilterUnion
} from '../../models/shared-filter.model';
import {DATA_SOURCE_BRANDS, DATA_SOURCE_COLORS, DATA_SOURCE_MAIN, DATA_SOURCE_PRICES} from './data/shared-filter.mock';
import {map} from 'rxjs/operators';
import {deepCopy} from '../../@shared/functions/deep-copy.function';

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

    public SharedFilterTypes: typeof SharedFilterTypes = SharedFilterTypes;

    public type$: BehaviorSubject<SharedFilterTypes> =
        new BehaviorSubject<SharedFilterTypes>(SharedFilterTypes.Main);

    public main$: BehaviorSubject<ISharedFilterMain[]> =
        new BehaviorSubject<ISharedFilterMain[]>([]);

    public colors$: BehaviorSubject<ISharedFilterColor[]> =
        new BehaviorSubject<ISharedFilterColor[]>([]);

    public brands$: BehaviorSubject<ISharedFilterBrand[]> =
        new BehaviorSubject<ISharedFilterBrand[]>([]);

    public prices$: BehaviorSubject<ISharedFilterPrice[]> =
        new BehaviorSubject<ISharedFilterPrice[]>([]);

    constructor(private modalCtrl: ModalController) {}

    ngOnInit(): void {
        this.main$.next(deepCopy(DATA_SOURCE_MAIN));
        setTimeout(() => this.colors$.next(deepCopy(DATA_SOURCE_COLORS)), 0);
        setTimeout(() => this.brands$.next(deepCopy(DATA_SOURCE_BRANDS)), 0);
        setTimeout(() => this.prices$.next(deepCopy(DATA_SOURCE_PRICES)), 0);
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

    public clearFilter(): void {
        // TODO: wtf copy
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
                    if ((mainValue as ISharedFilterPrice[]).includes(item)) {
                        (mainValue as ISharedFilterPrice[]).splice(
                            (main.find(x => x.type === type).value as ISharedFilterPrice[]).findIndex(x => x === item),
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
        return this.main$.asObservable().pipe(
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
}
