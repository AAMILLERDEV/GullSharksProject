import { Component, Input, OnInit } from '@angular/core';
import { Asset } from 'src/models/Asset';
import { CartItem } from 'src/models/CartItem';
import { Game } from 'src/models/Game';
import { GameDetails } from 'src/models/GameDetails';
import { User } from 'src/models/User';
import { Wishlist } from 'src/models/Wishlist';
import { AssetService } from 'src/services/asset.service';
import { CartItemService } from 'src/services/cartItem.service';
import { GameService } from 'src/services/game.service';
import { GameDetailService } from 'src/services/gameDetails.service';
import { UserService } from 'src/services/user.service';
import { WishlistService } from 'src/services/wishlist.service';
import * as bootstrap from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.css']
})
export class OffcanvasComponent implements OnInit {

  @Input() public user?: User;
  @Input() public games: Game[] = [];
  @Input() public gameDetails: GameDetails[] = [];
  @Input() public assets: Asset[] = [];
  @Input() public cartItems: CartItem[] = [];
  @Input() public wishlist: Wishlist[] = [];

  public test:string = '';

  public offcanvas?: bootstrap.Offcanvas;

  constructor(    public gameService: GameService,
    public gameDetailService: GameDetailService,
    public assetService: AssetService,
    public cartItemService: CartItemService,
    public wishlistService: WishlistService,
    public userService: UserService,
    public toastr: ToastrService,
    public router: Router){
  }

  ngOnInit(): void {
    this.offcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasScrolling")!, {backdrop: false});
  }

  public toggleCanvas(){
    this.offcanvas!.toggle();
  }

  public showCanvas(){
    this.offcanvas!.show();
  }

  public async addToCart(game: Game){

    this.showCanvas();

    if (this.cartItems.find(x => x.game_ID == game.id)){
      let newCartItem = this.cartItems.find(x => x.game_ID == game.id);
      newCartItem!.quantity++;
      newCartItem!.subtotal = newCartItem!.subtotal + game.priceInCAD;
      this.cartItems = this.cartItems.filter(x => x.game_ID != newCartItem!.game_ID);
      this.cartItems.push(newCartItem!);
      //await this.cartItemService.upsertCartItem(cartItem);
      sessionStorage.setItem("cart", JSON.stringify(this.wishlist));
      return;
    }

    let cartItem: CartItem = {
      game_ID: game.id, 
      id: 0, 
      isDeleted: false, 
      quantity: 1, 
      subtotal: game.priceInCAD, 
      total: (game.priceInCAD * 13), 
      user_ID: this.user!.id, 
      game: game
    };

    this.cartItems.push(cartItem)
    //await this.cartItemService.upsertCartItem(cartItem);
    sessionStorage.setItem("cart", JSON.stringify(this.wishlist));
  }

  public async addItemToWishlist(game: Game){
    this.showCanvas();

    if (this.wishlist.find(x => x.game_ID == game.id)){
      let newWishListItem = this.wishlist.find(x => x.game_ID == game.id);
      newWishListItem!.quantity++;
      this.wishlist = this.wishlist.filter(x => x.id != newWishListItem!.id);
      this.wishlist.push(newWishListItem!);
      //await this.wishlistService.upsertWishlist(wishlistItem);
      return;
    }

    let wishlistItem: Wishlist = {
      game_ID: game.id, 
      id: 0, 
      isDeleted: false, 
      quantity: 1, 
      user_ID: this.user!.id,
      dateAdded: new Date(),
      game: game
    };

    this.wishlist.push(wishlistItem);
    //await this.wishlistService.upsertWishlist(wishlistItem);
  }

  public async deleteCartItem(cartItem: CartItem){
    cartItem.isDeleted = true;
    this.cartItems = this.cartItems.filter(x => x.game_ID != cartItem.game_ID);
    //await this.cartItemService.upsertCartItem(cartItem);
  }

  public async deleteWishlistItem(wishlist: Wishlist){
    wishlist.isDeleted = true;
    this.wishlist = this.wishlist.filter(x => x.game_ID != wishlist.game_ID);
    //await this.wishlistService.upsertWishlist(wishlist);
  }

  public checkout(){
    this.router.navigateByUrl("/checkout");
  }
}
