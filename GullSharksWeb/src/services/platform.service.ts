import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Events } from 'src/models/Events';
import { PlatformsGamesLookUp } from 'src/models/PlatformsGamesLookUp';

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
    return this.sharedService.get(`PlatformGameLookUp/GetPlatformGameLookUp/${platform_ID}`);
  }

  public getPlatformGamesLookUpByGame(gameDetails_ID: number){
    return this.sharedService.get(`PlatformGameLookUp/GetPlatformGameLookupByGame/${gameDetails_ID}`);
  }

  public upsertPlatformGamesLookUp(plat: PlatformsGamesLookUp){
    return this.sharedService.upsert(`PlatformGameLookUp/UpsertPlatformGameLookup`, plat);
  }

}
