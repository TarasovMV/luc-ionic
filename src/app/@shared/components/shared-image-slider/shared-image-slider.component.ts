import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IonSlides} from '@ionic/angular';

@Component({
    selector: 'app-shared-image-slider',
    templateUrl: './shared-image-slider.component.html',
    styleUrls: ['./shared-image-slider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedImageSliderComponent implements OnInit {
    @ViewChild('ionSlides') ionSlide: IonSlides;
    @Input() imagesUrl: string[] = [];
    counter$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

    constructor() {
    }

    ngOnInit(): void {
    }

    public async slideDetectChange(): Promise<void> {
        const currentIdx = await this.ionSlide.getActiveIndex();
        this.counter$.next(currentIdx + 1);
    }
}
