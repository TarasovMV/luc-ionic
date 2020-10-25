import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {
    ISharedFilterBrand,
    ISharedFilterColor,
    ISharedFilterMain,
    ISharedFilterPrice,
    SharedFilterTypes
} from '../../../../models/shared-filter.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-shared-filter-menu-item',
    templateUrl: './shared-filter-menu-item.component.html',
    styleUrls: ['./shared-filter-menu-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedFilterMenuItemComponent implements OnInit {

    @Input() set data(val: ISharedFilterMain) {
        this.data$.next(val);
    }
    public data$: BehaviorSubject<ISharedFilterMain> = new BehaviorSubject<ISharedFilterMain>(null);
    public subValueObserver: Observable<string> = this.data$.asObservable().pipe(
        map((x) => {
            if (!x?.value) {
                return null;
            }
            switch (x.type) {
                case SharedFilterTypes.Brand:
                case SharedFilterTypes.Price:
                    return (x.value as ISharedFilterPrice | ISharedFilterBrand).label;
                case SharedFilterTypes.Color:
                    if (!x.value || !(x.value as ISharedFilterColor[]).length) {
                        return null;
                    } else {
                        return (x.value as ISharedFilterColor[])
                            .map(item => item.label)
                            .reduce((acc, val) => `${acc}, ${val}`);
                    }
            }
        })
    );

    constructor() {
    }

    ngOnInit(): void {
    }

}
