import { FormControl, FormGroup, Validators } from "@angular/forms";

export const ReviewsForm = new FormGroup ({
    gameControl: new FormControl(),
    descriptionControl: new FormControl(),
    ratingControl: new FormControl(),
    reviewsListControl: new FormControl(),
    approveControl: new FormControl("Approve"),
    rejectControl: new FormControl("Reject")
})
