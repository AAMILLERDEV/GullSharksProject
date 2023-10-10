import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Game } from 'src/models/Game';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  constructor(private sharedService: SharedService) {

  }

  public getGames(){
    return this.sharedService.get(`Game/GetGames`);
  }

  public upsertGame(game: Game){
    return this.sharedService.upsert(`Game/UpsertGame`, game);
  }
  
  public deleteGame(id: number, gameDetailsID: number){
    return this.sharedService.upsert(`Game/DeleteGame/${id}&${gameDetailsID}`, null);
  }
}
