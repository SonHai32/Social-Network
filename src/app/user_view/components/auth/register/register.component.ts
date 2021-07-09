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

  emailErrorTooltip(): string {
    if(this.validateForm.controls.email.invalid) {
      return 'Vui lòng nhập email';
    }
    return '';
  }

  passwordErrorTooltip(): string {
    if(this.validateForm.controls.password.hasError('required')) {
      return 'Vui lòng nhập mật khẩu';
    }else if(this.validateForm.controls.password.hasError('minlength')) {
      return 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    return '';
  }

  passwordConfirmErrorTooltip(): string {
    if(this.validateForm.controls.passwordConfirm.hasError('confirm')) {
      return 'Mật khẩu không khớp';
    }
    return '';
  }


  updateConfirmPassword(): void {
    Promise.resolve().then(() =>{
      this.validateForm.controls['passwordConfirm'].updateValueAndValidity();
    })
  }

  formSubmit(): void {
    this.validateForm.controls['email'].markAsDirty()
    for(const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      passwordConfirm :[null, [Validators.required ]],
      username:  [null, [Validators.required]]
    })
  }

}
