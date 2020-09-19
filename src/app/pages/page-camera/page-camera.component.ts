import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {CameraPreviewOptions} from '@capacitor-community/camera-preview';
import {CameraResultType, CameraSource} from '@capacitor/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

const {CameraPreview, Camera} = Plugins;

@Component({
    selector: 'app-page-camera',
    templateUrl: './page-camera.component.html',
    styleUrls: ['./page-camera.component.scss'],
})
export class PageCameraComponent implements AfterViewInit, OnDestroy {

    private imgSrc$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public imgSrcObservable: Observable<string> = this.imgSrc$.asObservable();
    get imgSrc(): string {
        return this.imgSrc$.getValue();
    }
    set imgSrc(value: string) {
        this.imgSrc$.next(value);
    }

    private subscriptions: Subscription[] = [];

    private options: CameraPreviewOptions = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        position: 'rear',
        toBack: true,
        parent: 'camera-preview',
        className: 'camera-preview',
    };

    constructor() {}

    public ngAfterViewInit(): void {
        this.subscriptions.push(
            this.imgSrcObservable.subscribe((ref) => {
                if (!!ref) {
                    CameraPreview.stop();
                } else {
                    setTimeout(() => CameraPreview.start(this.options));
                }
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
        CameraPreview.stop();
    }

    public switchCamera(): void {
        CameraPreview.flip();
    }

    public async openGallery(): Promise<void> {
        const capturedPhoto = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Photos,
            quality: 95,
        });

        this.imgSrc = capturedPhoto.dataUrl;
    }

    public async takePhoto(): Promise<void> {
        const capturedPhoto = await CameraPreview.capture({
            quality: 95,
        });
        this.imgSrc = `data:image/png;base64, ${capturedPhoto.value}`;
    }

    public cancelPhoto(): void {
        this.imgSrc = null;
    }
}
