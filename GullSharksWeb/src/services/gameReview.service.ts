import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Game } from 'src/models/Game';
import { GameReview } from 'src/models/GameReview';

@Injectable({
  providedIn: 'root'
})

export class GameReviewService {

  constructor(private sharedService: SharedService) {

  }

  public getGameReviews(){
    return this.sharedService.get(`GameReview/GetGameReviews`);
  }

  public upsertGameReview(gameReview: GameReview){
    return this.sharedService.upsert(`GameReview/UpsertGameReview`, gameReview);
  }
  
}
