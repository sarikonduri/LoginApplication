import { Component } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {DataService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Login App';
  loginForm: FormGroup;
  modalMsg: string;
  message: string;
  modalInstance: NgbModalRef;
  constructor(private modal: NgbModal, private data: DataService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [ Validators.required, this.emailValidator()]),
      password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    });
  }

  showLogin(loginInfo) {
    console.log('log success');
    this.loginForm.reset();
    this.modalInstance = this.modal.open(loginInfo);
  }
/*
* Validates the login details
**/
  validateLogin() {
    this.loginForm.controls.username.markAsTouched();
    this.loginForm.controls.password.markAsTouched();
    if (this.loginForm.valid) {
      this.data.login(this.loginForm.value).subscribe((res: any) => {
        if (res.success) {
          this.message = 'Login Success';
          this.modalInstance.close();
        } else {
          this.modalMsg = 'Failed to login';
        }
      });
    }

  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const isEmail = new RegExp('^[a-zA-Z0-9_\\.]+@[a-zA-Z0-9_\\.]+\\.[a-zA-Z]{2,5}$').test(control.value);
      return isEmail ?  null : {'invalidEmail': {value: control.value}};
    };
  }
}
