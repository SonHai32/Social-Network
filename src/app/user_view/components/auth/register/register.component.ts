import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'user-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  confirmPassword = (control: FormControl): {[s: string]: boolean} => {
    if(!control.value) {
      return {require: true};
    }
    else if(control.value !== this.validateForm.controls.password.value){
      return{confirm: true, error: true}
    }

    return {}
  }

  getEmailErrorTooltip(): string {
    if(this.validateForm.controls.email.hasError('required')) {
      return 'Vui lòng nhập email !';
    }else if(this.validateForm.controls.email.invalid)
    {
      return 'Email không hợp lệ !';
    }
    return '';
  }

  getPasswordErrorTooltip(): string {
    if(this.validateForm.controls.password.hasError('required')) {
      return 'Vui lòng nhập mật khẩu !';
    }else if(this.validateForm.controls.password.hasError('minlength')) {
      return 'Mật khẩu phải có ít nhất 6 ký tự !';
    }
    return '';
  }

  getPasswordConfirmErrorTooltip(): string {
    if(this.validateForm.controls.passwordConfirm.hasError('confirm')) {
      return 'Mật khẩu không khớp !';
    }else if(this.validateForm.controls.passwordConfirm.hasError('required')){
      return 'Mật khẩu không khớp !';
    }
    return '';
  }

  getUsernameErrorTooltip(): string{
    if(this.validateForm.controls.username.hasError('required')) {
      return 'Vui lòng nhập tên của bạn !'
    }else if(this.validateForm.controls.username.hasError('minlength')){
      return 'Tên quá ngắn !'
    }else if(this.validateForm.controls.username.hasError('maxlength')){
      return 'Tên quá dài !'
    }
    return ''
  }


  updateConfirmPassword(): void {
    Promise.resolve().then((val) =>{
      this.validateForm.controls['passwordConfirm'].updateValueAndValidity();
    })
  }

  submitForm(): void {
    for(const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [null, [Validators.required, this.confirmPassword]],
      username:  [null, [Validators.required, Validators.minLength(2), Validators.maxLength(36)]]
    })
  }

}
