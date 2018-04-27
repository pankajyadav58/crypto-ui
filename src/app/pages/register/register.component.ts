import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {UserService}  from './../../services/user/user.service';
import {Router} from '@angular/router'

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  providers: [UserService]
})
export class Register {

  public form:FormGroup;
  public name:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public submitted:boolean = false;

  constructor(fb:FormBuilder, private userService: UserService, private router: Router) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }
  userResponse:any = {};

  public onSubmit(values:any):void {
    console.log(values);
    this.submitted = true;
    if (this.form.valid) {
      let payload = {
        'user':{
          'name': values.name,
          'email': values.email,
          'password': values.passwords.password

        }
      }
      this.userService.register(payload).subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.submitted = false;
          console.log(error, 'error')
        }
    )
    }
  }
}
