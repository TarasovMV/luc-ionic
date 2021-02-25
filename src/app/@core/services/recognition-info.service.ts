import {Injectable} from '@angular/core';
import {IRecognitionResult} from '../../models/recognition.model';

@Injectable({
    providedIn: 'root'
})
export class RecognitionInfoService {

    recognitionSaveFunction: () => Promise<IRecognitionResult>;

    constructor() {
    }
}
