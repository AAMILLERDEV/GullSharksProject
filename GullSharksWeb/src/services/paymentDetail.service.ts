import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { PaymentDetail } from 'src/models/PaymentDetail';

@Injectable({
  providedIn: 'root'
})

export class PaymentDetailsService {

  constructor(private sharedService: SharedService) {

  }

  public getPaymentDetails(user_ID: number){
    return this.sharedService.get(`PaymentDetails/GetPaymentDetails/${user_ID}`);
  }

  public upsertPaymentDetails(paymentDetails: PaymentDetail){
    return this.sharedService.upsert("PaymentDetails/UpsertPaymentDetails", paymentDetails);
  }
}
