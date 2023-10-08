import { FormControl, FormGroup, Validators } from "@angular/forms";

export const addressForm = new FormGroup ({

    cityControl: new FormControl(),
    countryControl: new FormControl(),
    instructionsControl: new FormControl(),
    provinceControl: new FormControl(),
    postalCodeControl: new FormControl(),
    streetAddressControl: new FormControl(),
    submitControl: new FormControl("Save Changes")

})
