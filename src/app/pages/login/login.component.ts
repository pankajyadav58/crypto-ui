import {Component} from '@angular/core';
import {Router} from '@angular/router'
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {UserService}  from './../../services/user/user.service';


@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers: [UserService]
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder, private userService: UserService, public router:Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }
  userResponse:any;

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      this.userService.login({user: values}).subscribe(
        data => {
          this.userResponse = data;
          localStorage.setItem("access_token", data.token);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("btcAddress", data.user.btc);
          this.router.navigate(['/app/transaction']);
        },
        error => {
          console.log(error, 'error')
        }
    )
    }
  }
}
