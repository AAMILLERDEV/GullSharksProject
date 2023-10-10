import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Events } from 'src/models/Events';
import { Ratings } from 'src/models/Ratings';
import { Game } from 'src/models/Game';
import { GameDetails } from 'src/models/GameDetails';

@Injectable({
  providedIn: 'root'
})

export class GameDetailService {

  constructor(private sharedService: SharedService) {

  }

  public getGameDetails(){
    return this.sharedService.get(`GameDetails/GetGameDetails`);
  }

  public upsertGameDetails(gameDetails: GameDetails){
    return this.sharedService.upsert(`GameDetails/UpsertGameDetail`, gameDetails);
  }
  
}
