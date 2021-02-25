import {BehaviorSubject, Observable} from 'rxjs';
import {IPagePrefavoritesItem} from '../../../models/page-prefavorites.model';
import {map} from 'rxjs/operators';

export class PagePrefavoritesItemGroup {
    private items$: BehaviorSubject<IPagePrefavoritesItem[]> = new BehaviorSubject<IPagePrefavoritesItem[]>([]);
    public  itemsObserver$: Observable<IPagePrefavoritesItem[]> = this.items$;
    get items(): IPagePrefavoritesItem[] {
        return this.items$.getValue() ?? [];
    }
    set items(value: IPagePrefavoritesItem[]) {
        value = value?.length ? value : [];
        this.items$.next(value);
    }
    get activeItems(): IPagePrefavoritesItem[] {
        return this.items?.filter(x => !!x.isSelected) ?? [];
    }
    isValid$: Observable<boolean> = this.items$.asObservable().pipe(
        map(x => x.findIndex(i => !!i.isSelected) !== -1)
    );
    get isValid(): boolean {
        return this.items.findIndex(i => !!i.isSelected) !== -1;
    }

    constructor() {
        this.items = [
            {
                isSelected: false,
            },
            {
                isSelected: false,
            },
            {
                isSelected: false,
            },
            {
                isSelected: false,
            },
            {
                isSelected: false,
            },
        ];
    }

    public select(item: IPagePrefavoritesItem): void {
        item.isSelected = !item.isSelected;
        this.items = [...this.items];
    }
}
