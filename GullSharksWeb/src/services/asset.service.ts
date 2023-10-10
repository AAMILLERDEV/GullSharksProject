import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})

export class AssetService {

  constructor(private sharedService: SharedService) {

  }

  public getAssets(){
    return this.sharedService.get(`Asset/GetAssets`);
  }

}
