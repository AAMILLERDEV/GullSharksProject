import { FormControl, FormGroup, Validators } from "@angular/forms";

export const GamesForm = new FormGroup ({

    gameNameControl: new FormControl(),
    assetControl: new FormControl(),
    priceControl: new FormControl(),
    publisherControl: new FormControl(),
    categoryControl: new FormControl(),
    descriptionControl: new FormControl(),
    platformControl: new FormControl(),
    ratingControl: new FormControl()
})
