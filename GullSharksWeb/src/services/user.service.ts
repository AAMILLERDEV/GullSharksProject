import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private sharedService: SharedService) {

  }

  public getAllUsers(){
    return this.sharedService.get(`User/GetUsers`);
  }

  public getUserByID(id: number){
    return this.sharedService.get(`User/GetUserByID/${id}`);
  }

  public upsertUser(user: User){
    return this.sharedService.upsert("User/UpsertUser", user);
  }
}
