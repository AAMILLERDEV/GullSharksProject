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
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public users!: User[];
  //public users: User[] = [];
  public user!: User | undefined;

  public credentials?: Credentials[];
  public credential!: Credential | undefined;

  public signupForm!: FormGroup;
  public successModal!: bootstrap.Modal;

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



    if (this.user){
      this.router.navigateByUrl("home");
    }

    this.successModal = bootstrap.Modal.getOrCreateInstance('#successModal', {keyboard: true});

  }

  public async signUp(){

    if (this.signupForm.invalid) {
      this.toastr.error("Please fill out all form fields to submit.");
      return;
    }


    if (this.signupForm.controls['passwordControl'].value != this.signupForm.controls['passwordVerifyControl'].value){
      this.toastr.error("Passwords do not match");
      return;
    }

    let tempUsername = this.signupForm.controls['usernameControl'].value;
    let tempEmail = this.signupForm.controls['emailControl'].value;

    let userCheck = this.validateEmailAndUsername(tempUsername, tempEmail);

    if (userCheck){
      this.toastr.error("Sorry, that email and/or password is already taken, please use a differet one.");
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

    if (userRes < 1){
      this.toastr.error("Error, failed to process your information.");
      return;
    }

    const credentialValueBase64 = btoa(this.signupForm.controls['passwordControl'].value);

    let credential: Credentials = {
      id: 0,
      credentialValue: credentialValueBase64,
      user_ID: userRes,
      isDeleted: false
    }

    let credentialRes = await this.credentialService.upsertCredentials(credential);

    if (credentialRes < 1){
      this.toastr.error("Error, failed to process your information.");
      return;
    }

    user.credentials_ID = credentialRes;
    user.id = userRes;

    let userUpdateRes = await this.userService.upsertUser(user);


    this.toastr.warning("Please wait...");
    let res = await this.emailService.sendValidationEmail(user);
    if (res){
      this.user = user;
      this.successModal.toggle();
    }

    this.toastr.success("Success Email Sent.");
    return;

  }

  public validateEmailAndUsername(username: string, email: string){

    let usernameCheck = this.users.find(x => x.username == username);
    let emailCheck = this.users.find(x => x.email == email);

    if (usernameCheck || emailCheck){
      return true;
    }

    return false;
  }

  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

  public goToProfile(){
    sessionStorage.setItem("User", JSON.stringify(this.user));
    this.successModal.toggle();
    this.router.navigateByUrl('/profile');
    //Navigate to profile page
  }


}
