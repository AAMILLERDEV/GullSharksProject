import { FormControl, FormGroup, Validators } from "@angular/forms";

export const OrdersForm = new FormGroup ({

    gameControl: new FormControl(),
    quantityControl: new FormControl(),
    isConfirmedControl: new FormControl(false),
    orderDateControl: new FormControl(),
    cardTypeControl: new FormControl({disabled: true}),
    cardNumberControl: new FormControl(),
    totalCostControl: new FormControl(),
    addressControl: new FormControl(),
    orderNameControl: new FormControl(),
    userControl: new FormControl(),
    usernameControl: new FormControl()
})
