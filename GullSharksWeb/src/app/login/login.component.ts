import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service, RecaptchaErrorParameters } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';
import { LoginForm } from 'src/form-models/login-form';
import { User } from 'src/models/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public users!: User[];

  public user!: User | undefined;

  constructor(public router: Router,
    public userService: UserService,
    public toastr: ToastrService){
    this.loginForm = LoginForm;
  }

  public async ngOnInit() {
    this.users = await this.userService.getAllUsers();
  }

  public submitUserLoginCredentials(){

    this.user = this.users.find(x => x.email == this.loginForm.controls['passwordControl'].value && x.username == this.loginForm.controls['usernameControl'].value);

    if (this.user == null || this.user == undefined){
      this.toastr.error("Invalid Username/Email Combination");
      return;
    }

    sessionStorage.setItem("User", JSON.stringify(this.user));


    this.router.navigateByUrl("home");
  }

  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }
}