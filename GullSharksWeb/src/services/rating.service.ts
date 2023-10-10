import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Ratings } from 'src/models/Ratings';

@Injectable({
  providedIn: 'root'
})

export class RatingService {

  constructor(private sharedService: SharedService) {

  }

  public getRatings(){
    return this.sharedService.get(`Rating/GetRatings`);
  }

  public upsertRating(rating: Ratings){
    return this.sharedService.upsert(`Rating/UpsertRating`, rating);
  }
  
}
