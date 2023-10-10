import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {

  constructor(private sharedService: SharedService) {

  }

  public getLanguages(){
    return this.sharedService.get(`Language/GetLanguages`);
  }

}
