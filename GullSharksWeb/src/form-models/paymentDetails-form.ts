import { FormControl, FormGroup, Validators } from "@angular/forms";

export const PaymentDetailsForm = new FormGroup ({
    cardTypeControl: new FormControl(),
    cardNumberControl: new FormControl(),
    cvsControl: new FormControl(),
    totalControl: new FormControl()
})
