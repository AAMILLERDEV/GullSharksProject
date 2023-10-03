import { FormControl, FormGroup, Validators } from "@angular/forms";

export const LoginForm = new FormGroup ({

    usernameControl: new FormControl(null),
    passwordControl: new FormControl(null),
    loginBtnControl: new FormControl("Login") 

})
