import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { User } from 'src/models/User';
import { UserDetails } from 'src/models/UserDetails';

@Injectable({
  providedIn: 'root'
})

export class UserDetailsService {

  constructor(private sharedService: SharedService) {

  }

  public getAllUserDetails(){
    return this.sharedService.get(`UserDetails/GetUserDetails`);
  }

  public getUserDetailsByID(id: number){
    return this.sharedService.get(`UserDetails/GetUserDetailsByID/${id}`);
  }

  public upsertUserDetails(user: UserDetails){
    return this.sharedService.upsert("UserDetails/UpsertUserDetails", user);
  }
}
