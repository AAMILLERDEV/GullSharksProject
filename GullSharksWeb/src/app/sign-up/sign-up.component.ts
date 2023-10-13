import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';
import { SignupForm } from 'src/form-models/signup-form';
import { User } from 'src/models/User';
import { UserDetailsForm } from 'src/form-models/user-details-form';
import { UserService } from 'src/services/user.service';
import { Credentials } from 'src/models/Credentials';
import { CredentialService } from 'src/services/credential.service';
import { EmailService } from 'src/services/email.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public users?: User[];
  //public users: User[] = [];
  public user!: User | undefined;

  public credentials?: Credentials[];
  public credential!: Credential | undefined;

  public signupForm!: FormGroup;

constructor (public userService: UserService,
    public toastr: ToastrService,
    public credentialService: CredentialService,
    public emailService: EmailService,
    public router: Router) {
      this.signupForm = SignupForm;
  }

  public async ngOnInit(){
    this.users = await this.userService.getAllUsers();
    this.user = JSON.parse(sessionStorage.getItem("User")!);


    if (this.user && !this.user.isAdmin){
      this.router.navigateByUrl("home");
    }
  }

  public async signUp(){

    if (this.signupForm.invalid) {
      this.toastr.error("Please fill out all form fields to submit.");
      return;
    }

    let user: User = {
      id: 0,
      username: this.signupForm.controls['usernameControl'].value,
      email: this.signupForm.controls['emailControl'].value,
      credentials_ID: 0,
      isAdmin: false,
      isValidated: false,
      isDeleted: false
    }

    let userRes = await this.userService.upsertUser(user);

    user.id = userRes;
    user.credentials_ID = userRes;

    const passwordControlValue = this.signupForm.controls['passwordControl'].value;
    const credentialValueBase64 = btoa(passwordControlValue);

    let credential: Credentials = {
      id: 0,
      credentialValue: credentialValueBase64,
      user_ID: 0,
      isDeleted: false
    }

    let credentialRes = await this.credentialService.upsertCredentials(credential);

    credential.id = credentialRes;
    credential.user_ID = credentialRes;

    user.id = credential.id;
    user.credentials_ID = credential.user_ID;

    if (user.email != null){
      this.toastr.warning("Please wait...");
      let res = await this.emailService.sendValidationEmail(user);
      if (res){
        this.toastr.success("Email has been sent for validation.");

        let userUpdateRes = await this.userService.upsertUser(user);

        let credentialUpdateRes = await this.credentialService.upsertCredentials(credential);

        this.toastr.success("Success, User Added");

        this.router.navigateByUrl('/login');

        return;
      }

      this.toastr.success("Error.");
      return;
    }

    this.toastr.success("Unable to send request.");
    //return;


  }

  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }
}
