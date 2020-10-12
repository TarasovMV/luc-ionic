import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {Plugins} from '@capacitor/core';
import {CameraPreviewOptions} from '@capacitor-community/camera-preview';
import {CameraResultType, CameraSource} from '@capacitor/core';
import {BehaviorSubject, interval, Observable, Subscription} from 'rxjs';
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

    constructor(private location: Location) {}

    public ngAfterViewInit(): void {
        this.subscriptions.push(
            this.imgSrcObservable.subscribe((ref) => {
                if (!!ref) {
                    CameraPreview.stop();
                } else {
                    queueMicrotask(() => CameraPreview.start(this.options));
                }
            })
        );
    }

    public async ngOnDestroy(): Promise<void> {
        this.subscriptions.forEach((s) => s.unsubscribe());
        this.imgSrc = null;
        CameraPreview.stop();
    }

    public switchCamera(): void {
        CameraPreview.flip();
    }

    public async openGallery(): Promise<void> {
        const capturedPhoto = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Photos,
            quality: 70,
        });

        this.imgSrc = capturedPhoto.dataUrl;
    }

    public async takePhoto(): Promise<void> {
        const capturedPhoto = await CameraPreview.capture({
            quality: 70,
        });
        this.imgSrc = `data:image/png;base64, ${capturedPhoto.value}`;
    }

    public clickClose(): void {
        if (!!this.imgSrc) {
            this.cancelPhoto();
        } else {
            this.goToPreviousRoute();
        }
    }

    // TODO add photo request and route to next screen
    public findPhoto(): void {
        console.log('find photo');
    }

    private cancelPhoto(): void {
        this.imgSrc = null;
    }

    private goToPreviousRoute = (): void => {
        CameraPreview.stop();
        // for camera stop fix
        queueMicrotask(() => this.location.back());
    }
}
