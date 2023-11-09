import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Game } from 'src/models/Game';
import { Order } from 'src/models/Order';
import { OrderDetail } from 'src/models/OrderDetail';

@Injectable({
  providedIn: 'root'
})

export class OrderDetailService {

  constructor(private sharedService: SharedService) {

  }

  public getOrderDetailsByID(id: number){
    return this.sharedService.get(`OrderDetails/GetOrderDetailsByID/${id}`);
  }

  public upsertOrderDetails(orderDetail: OrderDetail){
    return this.sharedService.upsert(`OrderDetails/UpsertOrderDetails`, orderDetail);
  }
  
}
