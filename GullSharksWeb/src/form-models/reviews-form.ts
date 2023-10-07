import { FormControl, FormGroup, Validators } from "@angular/forms";

export const ReviewsForm = new FormGroup ({
    gameControl: new FormControl(),
    descriptionControl: new FormControl(),
    ratingControl: new FormControl(),
    submitControl: new FormControl("Submit")
})
