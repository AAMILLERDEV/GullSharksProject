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

  public loginCounter: number = 0;

  constructor(public router: Router,
    public userService: UserService,
    public toastr: ToastrService){
    this.loginForm = LoginForm;
  }

  public async ngOnInit() {
    this.users = await this.userService.getAllUsers();
    this.loginCounter = JSON.parse(sessionStorage.getItem("LoginCounter")!);
  }

  public submitUserLoginCredentials(){

    if (this.loginCounter >= 3){
      this.toastr.error("Error, no more login attempts are allowed. Please reset your password to proceed.");
      return;
    }

    if (!this.loginForm.valid){
      this.toastr.error("Username, password and captcha is required.");
      this.loginCounter++;
      this.saveLoginAttempt();
      return;
    }

    this.user = this.users.find(x => x.email == this.loginForm.controls['passwordControl'].value && x.username == this.loginForm.controls['usernameControl'].value);

    if (this.user == null || this.user == undefined){
      this.toastr.error("No login found for the details provided.");
      this.loginCounter++;
      this.saveLoginAttempt();
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

  public sendLoginDetailsReset(){
    this.loginCounter = 0;
    this.saveLoginAttempt();
  }

  public saveLoginAttempt(){
    sessionStorage.setItem("LoginCounter", JSON.stringify(this.loginCounter));
  }

}