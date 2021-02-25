import {IPageCameraDot} from '../../../../models/page-camera.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IRecognitionDetectedObject} from "../../../../models/recognition.model";

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

    constructor(
        dots: IRecognitionDetectedObject[],
        imgRange: { rangeX: number[]; rangeY: number[]; },
        imgDimension: { width: number; height: number; }
    ) {
        this.dots = this.dotsMapper(dots, imgRange, imgDimension);
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

    private dotsMapper(
        dots: IRecognitionDetectedObject[],
        imgRange: { rangeX: number[]; rangeY: number[]; },
        imgDimension: { width: number; height: number; }
    ): IPageCameraDot[] {
        const center = (a: number, b: number): number => {
            return b - (b - a) / 2;
        };
        return dots
            ?.map(d => ({
                id: d.id,
                x: center(d.area.lowerLeftCorner.x, d.area.upperRightCorner.x),
                y: imgDimension.height - center(d.area.lowerLeftCorner.y, d.area.upperRightCorner.y),
            }))
            ?.filter(d => d.x >= 0 && d.x <= imgDimension.width && d.y >= 0 && d.y <= imgDimension.height)
            ?.map(d => ({
                id: d.id,
                position: {
                    x: d.x * (imgRange.rangeX[1] - imgRange.rangeX[0]) / imgDimension.width + imgRange.rangeX[0],
                    y: d.y * (imgRange.rangeY[1] - imgRange.rangeY[0]) / imgDimension.height + imgRange.rangeY[0],
                },
                isChosen: false,
            })) ?? [];
    }
}
