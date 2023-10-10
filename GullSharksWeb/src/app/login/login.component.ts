import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service, RecaptchaErrorParameters } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';
import { LoginForm } from 'src/form-models/login-form';
import { User } from 'src/models/User';
import { CredentialService } from 'src/services/credential.service';
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
    public toastr: ToastrService,
    public credentialService: CredentialService){
    this.loginForm = LoginForm;
  }

  public async ngOnInit() {
    this.users = await this.userService.getAllUsers();
    this.loginCounter = JSON.parse(sessionStorage.getItem("LoginCounter")!);
  }

  public async submitUserLoginCredentials(){
    let loginTimer = sessionStorage.getItem("LoginTimer");

    if (loginTimer != null){
      if (new Date(loginTimer!).getMinutes() + 1 < new Date().getMinutes()){
        this.loginCounter = 0;
        sessionStorage.removeItem("LoginTimer");
        this.saveLoginAttempt();
      }
    }

    if (this.loginCounter >= 3){
      this.toastr.error("Error, no more login attempts are allowed. Please wait 1 minute to proceed.");
      return;
    }

    if (!this.loginForm.valid){
      this.toastr.error("Username, password and captcha is required.");
      this.loginCounter++;
      this.saveLoginAttempt();
      return;
    }

    this.user = this.users.find(x => x.username == this.loginForm.controls['usernameControl'].value);

    if (this.user == null || this.user == undefined){
      this.toastr.error("No login found for the details provided.");
      this.loginCounter++;
      this.saveLoginAttempt();
      return;
    }

    let check = await this.checkCredentials(this.user, btoa(this.loginForm.controls['passwordControl'].value));

    console.log(check);

    if (check == false){
      this.toastr.error("No login found for the details provided.");
      this.loginCounter++;
      this.saveLoginAttempt();
      return;
    } else {
      sessionStorage.setItem("User", JSON.stringify(this.user));

      this.router.navigateByUrl("home");
    }
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

    if (this.loginCounter == 3){
      sessionStorage.setItem("LoginTimer", JSON.stringify(new Date().toLocaleString()));
    }

    sessionStorage.setItem("LoginCounter", JSON.stringify(this.loginCounter));
  }

  public async checkCredentials(user: User, cred: string){
    return await this.credentialService.checkCredentials(user, cred);
  }


}