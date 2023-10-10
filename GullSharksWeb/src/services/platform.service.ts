import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Events } from 'src/models/Events';

@Injectable({
  providedIn: 'root'
})

export class PlatformService {

  constructor(private sharedService: SharedService) {

  }

  public getPlatforms(){
    return this.sharedService.get(`Platform/GetPlatforms`);
  }

  public getPlatformGamesLookUp(platform_ID: number){
    return this.sharedService.get(`PlatformGameLookUp/GetPlatforms/${platform_ID}`);
  }
  
}
