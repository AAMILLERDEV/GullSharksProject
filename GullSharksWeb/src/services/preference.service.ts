import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { PlatformPreference } from 'src/models/PlatformPreference';
import { Language } from 'src/models/Language';
import { LanguagePreference } from 'src/models/LanguagePreference';
import { CategoryPreference } from 'src/models/CategoryPreference';

@Injectable({
  providedIn: 'root'
})

export class PreferenceService {

  constructor(private sharedService: SharedService) {

  }

  public getPlatformPreferences(user_ID: number){
    return this.sharedService.get(`Preference/GetPlatformPreferences/${user_ID}`);
  }

  public getLanguagePreferences(user_ID: number){
    return this.sharedService.get(`Preference/GetLanguagePreference/${user_ID}`);
  }

  public getCategoryPreferences(user_ID: number){
    return this.sharedService.get(`Preference/GetCategoryPreferences/${user_ID}`);
  }

  public upsertPlatformPreference(ins: PlatformPreference){
    return this.sharedService.upsert(`Preference/UpsertPlatformPreference`, ins);
  }

  public upsertLanguagePreference(ins: LanguagePreference){
    return this.sharedService.upsert(`Preference/UpsertLanguagePreference`, ins);
  }

  public upsertCategoryPreference(ins: CategoryPreference){
    return this.sharedService.upsert(`Preference/UpsertCategoryPreference`, ins);
  }


}
