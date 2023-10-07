import { FormControl, FormGroup, Validators } from "@angular/forms";

export const EventsForm = new FormGroup ({

    eventNameControl: new FormControl(),
    descriptionControl: new FormControl(),
    startDateControl: new FormControl(),
    endDateControl: new FormControl(),
    submitControl: new FormControl("Submit")

})
