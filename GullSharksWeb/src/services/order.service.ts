import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Game } from 'src/models/Game';
import { Order } from 'src/models/Order';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private sharedService: SharedService) {

  }

  public getOrdersByUserID(user_ID: number){
    return this.sharedService.get(`Order/GetOrderByID/${user_ID}`);
  }

  public getOrders(){
    return this.sharedService.get(`Order/GetOrders`);
  }

  public upsertOrder(order: Order){
    return this.sharedService.upsert(`Order/UpsertOrder`, order);
  }
  
}
