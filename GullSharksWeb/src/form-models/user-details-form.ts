import { FormControl, FormGroup, Validators } from "@angular/forms";

export const UserDetailsForm = new FormGroup ({

    firstNameControl: new FormControl(null),
    lastNameControl: new FormControl(null),
    genderControl: new FormControl(null),
    birthDateControl: new FormControl(null),
    emailUpdatesControl: new FormControl()

})
