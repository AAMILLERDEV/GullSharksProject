import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { User } from 'src/models/User';
import { UserGame } from 'src/models/UserGames';

@Injectable({
  providedIn: 'root'
})

export class UserGameService {

  constructor(private sharedService: SharedService) {

  }

  public getUserGames(user_ID: number){
    return this.sharedService.get(`UserGame/GetUserGames/${user_ID}`);
  }


  public upsertUserGame(user: UserGame){
    return this.sharedService.upsert("UserGame/UpsertUserGame", user);
  }
}
