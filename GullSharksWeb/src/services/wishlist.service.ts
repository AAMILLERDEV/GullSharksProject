import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Game } from 'src/models/Game';
import { Wishlist } from 'src/models/Wishlist';

@Injectable({
  providedIn: 'root'
})

export class WishlistService {

  constructor(private sharedService: SharedService) {

  }

  public getWishlist(){
    return this.sharedService.get(`Wishlist/GetWishlist`);
  }

  public getWishlistByUserID(user_ID: number){
    return this.sharedService.get(`Wishlist/GetWishlistByUserID/${user_ID}`);
  }

  public upsertWishlist(wishlist: Wishlist){
    return this.sharedService.upsert(`Wishlist/UpsertWishlist`, wishlist);
  }
  
}
