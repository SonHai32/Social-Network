import { Observable } from 'rxjs';
import { AuthActions } from '../../../store/auth/auth.action';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getIsLoadingSelector } from 'src/app/social-network/store/auth/auth.selectors';

@Component({
  selector: 'user-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  isLoginLoading!: Observable<boolean>;
  constructor(private fb: FormBuilder, private store: Store) {}

  getEmailErrorTooltip(): string {
    if (this.validateForm.controls.email.hasError('required')) {
      return 'Vui lòng nhập email !';
    } else if (this.validateForm.controls.email.invalid) {
      return 'Email không hợp lệ !';
    }
    return '';
  }

  getPasswordErrorTooltip(): string {
    if (this.validateForm.controls.password.invalid) {
      return 'Vui lòng nhập mật khẩu';
    }
    return '';
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

    this.isLoginLoading = this.store.select(getIsLoadingSelector);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.store.dispatch(
        AuthActions.Login({
          userCredentials: {
            email: this.validateForm.controls.email.value,
            password: this.validateForm.controls.password.value,
          },
        })
      );
    }
  }
}
