import { AppState } from './../../../store/app.state';
import { Observable } from 'rxjs';
import { UserCredentials } from './../../../models/user-credentials.model';
import { AuthActions } from './../../../store/auth/auth.action';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/user_view/store/auth/auth.state';
import { getAuthSelector, getIsLoadingSelector } from 'src/app/user_view/store/auth/auth.selectors';
@Component({
  selector: 'user-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;
  authLoading$!: Observable<boolean>

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}
  confirmPassword = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { require: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }

    return {};
  };

  getEmailErrorTooltip(): string {
    if (this.validateForm.controls.email.hasError('required')) {
      return 'Vui lòng nhập email !';
    } else if (this.validateForm.controls.email.invalid) {
      return 'Email không hợp lệ !';
    }
    return '';
  }

  getPasswordErrorTooltip(): string {
    if (this.validateForm.controls.password.hasError('required')) {
      return 'Vui lòng nhập mật khẩu !';
    } else if (this.validateForm.controls.password.hasError('minlength')) {
      return 'Mật khẩu phải có ít nhất 6 ký tự !';
    }
    return '';
  }

  getPasswordConfirmErrorTooltip(): string {
    if (this.validateForm.controls.passwordConfirm.hasError('confirm')) {
      return 'Mật khẩu không khớp !';
    } else if (
      this.validateForm.controls.passwordConfirm.hasError('required')
    ) {
      return 'Mật khẩu không khớp !';
    }
    return '';
  }

  getUsernameErrorTooltip(): string {
    if (this.validateForm.controls.username.hasError('required')) {
      return 'Vui lòng nhập tên của bạn !';
    } else if (this.validateForm.controls.username.hasError('minlength')) {
      return 'Tên quá ngắn !';
    } else if (this.validateForm.controls.username.hasError('maxlength')) {
      return 'Tên quá dài !';
    }
    return '';
  }

  updateConfirmPassword(): void {
    Promise.resolve().then((val) => {
      this.validateForm.controls['passwordConfirm'].updateValueAndValidity();
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      const user: UserCredentials = {
        email: this.validateForm.controls.email.value,
        password: this.validateForm.controls.password.value,
        display_name: this.validateForm.controls.username.value,
      };
      this.store.dispatch(AuthActions.Register({ userCredentials: user }));
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [null, [Validators.required, this.confirmPassword]],
      username: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(36),
        ],
      ],
    });

    this.authLoading$ = this.store.select(getIsLoadingSelector);
  }
}
