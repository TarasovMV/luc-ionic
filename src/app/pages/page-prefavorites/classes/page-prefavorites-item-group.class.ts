import {BehaviorSubject, Observable} from 'rxjs';
import {IPagePrefavoritesItem} from '../../../models/page-prefavorites.model';
import {map} from 'rxjs/operators';
import {IStartScreenReco} from '../../../models/recognition.model';

export class PagePrefavoritesItemGroup {
    private readonly verifyCount: number = 3;
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
        map(x => x.filter(i => i.isSelected)?.length >= this.verifyCount)
    );
    get isValid(): boolean {
        return this.items.filter(i => i.isSelected)?.length >= this.verifyCount;
    }

    constructor(items: IStartScreenReco[]) {
        this.items = items.map(x => ({...x, file: `data:image/png;base64, ${x.file}`, isSelected: false}));
    }

    public select(item: IPagePrefavoritesItem): void {
        item.isSelected = !item.isSelected;
        this.items = [...this.items];
    }
}
