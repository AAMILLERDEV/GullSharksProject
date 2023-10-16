import { FormControl, FormGroup, Validators } from "@angular/forms";

export const PasswordForm = new FormGroup ({

    currentPasswordControl: new FormControl(),
    newPasswordControl: new FormControl(),
    verifyPasswordControl: new FormControl()
})
