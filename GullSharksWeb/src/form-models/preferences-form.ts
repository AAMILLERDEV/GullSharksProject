import { FormControl, FormGroup, Validators } from "@angular/forms";

export const PreferencesForm = new FormGroup ({
    platformControl: new FormControl(),
    categoryControl: new FormControl(),
    languageControl: new FormControl(),
    submitControl: new FormControl("Submit")
})
