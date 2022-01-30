import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {delay, filter, map, switchMap, take, tap} from 'rxjs/operators';

type DataRoom = { [key: string]: unknown };
const DELAY: number = 1000;

@Injectable({
    providedIn: 'root'
})
export class ApiReferencesService {
    responses$: BehaviorSubject<DataRoom> = new BehaviorSubject<DataRoom>({});

    constructor(private http: HttpClient) {
        this.checkRoom().subscribe();
    }

    public request<T, U>(method: string, params: T): Observable<U> {
        const uuid = uuidGenerator();
        return this.http.post<unknown>('url', params).pipe(
            switchMap(x => this.getResponse<U>(uuid))
        );
    }

    private getResponse<T>(uuid: string): Observable<T> {
        return this.responses$.pipe(
            map(x => x[uuid] as T | undefined),
            filter(x => !!x),
            take(1)
        );
    }

    private checkRoom(): Observable<unknown> {
        return this.http.get<DataRoom>('url').pipe(
            tap(x => this.mapResponses(x)),
            delay(DELAY),
            switchMap(x => this.checkRoom())
        );
    }

    // TODO
    private checkReferences(): Observable<unknown> {
        return of(null);
    }

    private mapResponses(response: DataRoom): void {
        this.responses$.next({...this.responses$.getValue(), ...response});
    }
}

function uuidGenerator(): string {
    return 'uuid';
}
