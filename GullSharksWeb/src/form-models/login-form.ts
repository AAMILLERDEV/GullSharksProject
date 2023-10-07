import { FormControl, FormGroup, Validators } from "@angular/forms";

export const LoginForm = new FormGroup ({

    usernameControl: new FormControl(null),
    passwordControl: new FormControl(null),
    recaptchaControl: new FormControl(null, Validators.required),
    loginBtnControl: new FormControl("Login"),
    forgotCredentialsBtnControl: new FormControl("Reset Password"),
    signupBtnControl: new FormControl("Sign Up Here")

})
