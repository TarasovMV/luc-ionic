import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {Plugins} from '@capacitor/core';
import {CameraPreviewOptions} from '@capacitor-community/camera-preview';
import {CameraResultType, CameraSource} from '@capacitor/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {NavController} from '@ionic/angular';
const {CameraPreview, Camera} = Plugins;

@Component({
    selector: 'app-page-camera',
    templateUrl: './page-camera.component.html',
    styleUrls: ['./page-camera.component.scss'],
})
export class PageCameraComponent implements AfterViewInit, OnDestroy {

    public readonly nextRouteUrl: string = '/main/scan';
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

    constructor(private location: Location, private navCtrl: NavController) {}

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
        console.log('destroy camera');
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

    // TODO add photo request
    public async findPhoto(): Promise<void> {
        console.log('find photo');
        await this.navCtrl.navigateRoot(this.nextRouteUrl);
    }

    private cancelPhoto(): void {
        this.imgSrc = null;
    }

    private goToPreviousRoute = (): void => {
        CameraPreview.stop();
        // queueMicrotask for camera stop fix
        queueMicrotask(() => this.location.back());
    }
}
