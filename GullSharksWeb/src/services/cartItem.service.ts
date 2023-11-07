import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { User } from 'src/models/User';
import { CartItem } from 'src/models/CartItem';

@Injectable({
  providedIn: 'root'
})

export class CartItemService {

  constructor(private sharedService: SharedService) {

  }

  public getCartItemsByUserID(user_ID: number){
    return this.sharedService.get(`CartItems/GetCartItemsByUserID/${user_ID}`);
  }

  public upsertCartItem(cartItem: CartItem){
    return this.sharedService.upsert(`CartItems/UpsertCartItem`, cartItem);
  }
}
