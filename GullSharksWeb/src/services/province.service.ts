import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})

export class ProvinceService {

  constructor(private sharedService: SharedService) {

  }

  public getProvinces(){
    return this.sharedService.get(`Province/GetProvinces`);
  }

}
