import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { FriendsList } from 'src/models/FriendsList';

@Injectable({
  providedIn: 'root'
})

export class FriendsListService {

  constructor(private sharedService: SharedService) {

  }

  public getFriendsListByUserID(user_ID: number){
    return this.sharedService.get(`FriendsList/GetFriendsListByUserID/${user_ID}`);
  }

  public getFriendsListByID(id: number){
    return this.sharedService.get(`FriendsList/GetFriendsListByID/${id}`);
  }

  public upsertFriendsList(friendsList: FriendsList){
    return this.sharedService.upsert(`FriendsList/UpsertFriendsList`, friendsList);
  }

}
