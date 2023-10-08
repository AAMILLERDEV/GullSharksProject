import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';
import { SignupForm } from 'src/form-models/signup-form';
import { User } from 'src/models/User';
import { UserService } from 'src/services/user.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public users?: User[];
  public signupForm!: FormGroup;

constructor (public userService: UserService,
    public toastr: ToastrService,
    public router: Router) {
      this.signupForm = SignupForm;
  }

  public async ngOnInit(){

  }

  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }
}
