import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

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
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
}
