import { FormControl, FormGroup, Validators } from "@angular/forms";

export const AddressForm = new FormGroup ({

    cityControl: new FormControl(),
    countryControl: new FormControl(),
    instructionsControl: new FormControl(),
    provinceControl: new FormControl(),
    postalCodeControl: new FormControl(),
    streetAddressControl: new FormControl(),
    phoneNumberControl: new FormControl(),
    shippingAddressControl: new FormControl()
})
