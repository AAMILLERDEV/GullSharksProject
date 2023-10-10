import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})

export class CountryService {

  constructor(private sharedService: SharedService) {

  }

  public getCountries(){
    return this.sharedService.get(`Country/GetCountries`);
  }

}
