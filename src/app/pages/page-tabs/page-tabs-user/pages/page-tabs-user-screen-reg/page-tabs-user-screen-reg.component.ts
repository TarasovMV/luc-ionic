import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingService} from '../../../../../@core/services/loading.service';
import {ApiUserService} from '../../../../../@core/services/api/api-user.service';
import {UserInfoService} from "../../../../../@core/services/user-info.service";

@Component({
    selector: 'app-page-tabs-user-screen-reg',
    templateUrl: './page-tabs-user-screen-reg.component.html',
    styleUrls: ['./page-tabs-user-screen-reg.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsUserScreenRegComponent implements OnInit {

    public regForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        passwords: new FormGroup({
            password: new FormControl('', [Validators.required, Validators.minLength(3)]),
            repeatPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
        }, [matchValidator]),
        isPersonalDataAgree: new FormControl(false, [agreeValidator]),
    });

    constructor(
        private loadingService: LoadingService,
        private apiUserService: ApiUserService,
        private userService: UserInfoService,
    ) {
    }

    ngOnInit(): void {
        this.regForm.valueChanges.subscribe(x => console.log(x));

    }

    public agreeClick(): void {
        this.regForm.get('isPersonalDataAgree').markAsDirty();
        this.regForm.get('isPersonalDataAgree').setValue(!this.regForm.get('isPersonalDataAgree').value);
    }

    public checkFieldError(fieldName: string): boolean {
        return this.regForm.get(fieldName)?.errors && this.regForm.get(fieldName)?.dirty;
    }

    public checkFieldPassError(fieldName: string): boolean {
        const passFg = this.regForm.get('passwords');
        return passFg.get(fieldName)?.errors && (passFg.get(fieldName)?.dirty || passFg.get(fieldName)?.touched);
    }

    public async regClick(): Promise<void> {
        Object.values(this.regForm.controls).forEach(x => x.markAsDirty());
        this.regForm.markAllAsTouched();
        if (!this.regForm.valid) {
            console.warn('invalid form');
            return;
        }
        await this.loadingService.startLoading();
        const res = await this.apiUserService.userRegister(this.regForm.value);
        this.loadingService.stopLoading().then();
        this.userService.setUser(res);
    }
}

function matchValidator(group: FormGroup) {
    const values = Object.values(group.value);
    if (values?.length === values.filter(x => x === values[0]).length) {
        return null;
    }
    return { mismatch: { message: 'Values are not equal' }};
}

function agreeValidator(control: FormControl) {
    if (!!control.value) {
        return null;
    }
    return { agree: { message: 'Values are not agree' }};
}


