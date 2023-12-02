import { FormControl, FormGroup, Validators } from "@angular/forms";
import { min } from "rxjs";

export const SignupForm = new FormGroup ({

    usernameControl: new FormControl(null),
    passwordControl: new FormControl(null),
    passwordVerifyControl: new FormControl(null),
    emailControl: new FormControl(null),
    recaptchaControl: new FormControl(null, Validators.required),
    submitControl: new FormControl("Proceed")

})
