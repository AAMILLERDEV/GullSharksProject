import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { ShippingAddress } from 'src/models/ShippingAddress';

@Injectable({
  providedIn: 'root'
})

export class ShippingAddressService {

  constructor(private sharedService: SharedService) {

  }

  public getShippingAddress(userDetails_ID: number){
    return this.sharedService.get(`ShippingAddress/GetShippingAddress/${userDetails_ID}`);
  }

  public upsertShippingAddress(ba: ShippingAddress){
    return this.sharedService.upsert(`ShippingAddress/UpsertShippingAddress`, ba);
  }
}
