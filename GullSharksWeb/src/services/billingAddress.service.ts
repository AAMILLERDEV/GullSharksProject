import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { BillingAddress } from 'src/models/BillingAddress';

@Injectable({
  providedIn: 'root'
})

export class BillingAddressService {

  constructor(private sharedService: SharedService) {

  }

  public getBillingAddress(userDetails_ID: number){
    return this.sharedService.get(`BillingAddress/GetBillingAddress/${userDetails_ID}`);
  }

  public upsertBillingAddress(ba: BillingAddress){
    return this.sharedService.upsert(`BillingAddress/UpsertBillingAddress`, ba);
  }
}
