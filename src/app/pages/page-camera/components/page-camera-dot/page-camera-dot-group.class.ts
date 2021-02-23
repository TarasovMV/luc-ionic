import {IPageCameraDot} from '../../../../models/page-camera.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class PageCameraDotGroup {
    private dots$: BehaviorSubject<IPageCameraDot[]> = new BehaviorSubject<IPageCameraDot[]>([]);
    public dotsObserver$: Observable<IPageCameraDot[]> = this.dots$.asObservable();
    public isValid$: Observable<boolean> = this.dots$.asObservable().pipe(
        map(x => x.findIndex(d => !!d.isChosen) !== -1)
    );
    private set dots(value: IPageCameraDot[]) {
        if (!value) {
            value = [];
        }
        this.dots$.next(value);
    }
    private get dots(): IPageCameraDot[] {
        return this.dots$.getValue();
    }
    public get selectedDot(): IPageCameraDot {
        return this.dots?.find(x => !!x.isChosen) ?? null;
    }

    constructor() {
        this.dots = [
            {
                position: {
                    x: 30,
                    y: 296,
                },
                isChosen: false,
            },
            {
                position: {
                    x: 345,
                    y: 517,
                },
                isChosen: false,
            },
        ];
    }

    public selectDot(dot: IPageCameraDot): void {
        console.log(dot);
        const isChosenCur = !!dot.isChosen;
        const dots = this.dots;
        dots.forEach(x => x.isChosen = false);
        dot.isChosen = !isChosenCur;
        this.dots = [...dots];
    }

    public clear(): void {
        this.dots = [];
    }
}
