import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() updateSignal: EventEmitter<any> = new EventEmitter();

  public test:string = '';

  public offcanvas?: bootstrap.Offcanvas;
  public offcanvasWishlist?: bootstrap.Offcanvas;

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
    this.offcanvasWishlist = new bootstrap.Offcanvas(document.getElementById("offcanvasScrollingWishlist")!, {backdrop: false});
    this.cartItems = JSON.parse(sessionStorage.getItem("cart")!);
  }

  public updateCartAndWishlist(){
    this.updateSignal.emit();
  }

  public toggleCanvas(){
    this.offcanvas!.toggle();
  }

  public showCanvas(){
    this.offcanvas!.show();
  }

  public toggleCanvasWishlist(){
    this.offcanvasWishlist!.toggle();
  }

  public showCanvasWishlist(){
    this.offcanvasWishlist!.show();
  }

  public async addToCart(game: Game){
    this.offcanvasWishlist?.hide();
    this.showCanvas();

    if (this.cartItems.find(x => x.game_ID == game.id)){
      let newCartItem = this.cartItems.find(x => x.game_ID == game.id);
      newCartItem!.quantity++;
      newCartItem!.subtotal = newCartItem!.subtotal + game.priceInCAD;
      this.cartItems = this.cartItems.filter(x => x.game_ID != newCartItem!.game_ID);
      this.cartItems.push(newCartItem!);
      //await this.cartItemService.upsertCartItem(cartItem);
      sessionStorage.setItem("cart", JSON.stringify(this.cartItems));
      this.updateCartAndWishlist();
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
    sessionStorage.setItem("cart", JSON.stringify(this.cartItems));
    this.updateCartAndWishlist();
  }

  public async addItemToWishlist(game: Game){
    this.offcanvas?.hide();
    this.showCanvasWishlist();

    if (this.wishlist.find(x => x.game_ID == game.id)){
      let newWishListItem = this.wishlist.find(x => x.game_ID == game.id);
      newWishListItem!.quantity++;
      this.wishlist = this.wishlist.filter(x => x.game_ID != newWishListItem!.game_ID);
      this.wishlist.push(newWishListItem!);
      sessionStorage.setItem("wishlist", JSON.stringify(this.wishlist));
      //await this.wishlistService.upsertWishlist(wishlistItem);
      this.updateCartAndWishlist();
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
    sessionStorage.setItem("wishlist", JSON.stringify(this.wishlist));
    //await this.wishlistService.upsertWishlist(wishlistItem);
    this.updateCartAndWishlist();
  }

  public async deleteCartItem(cartItem: CartItem){
    cartItem.isDeleted = true;
    this.cartItems = this.cartItems.filter(x => x.game_ID != cartItem.game_ID);
    //await this.cartItemService.upsertCartItem(cartItem);
    sessionStorage.setItem("cart", JSON.stringify(this.cartItems));
    this.updateCartAndWishlist();
    if (this.cartItems.length == 0){
      this.offcanvas?.hide();
    }
  }

  public async deleteWishlistItem(wishlist: Wishlist){
    wishlist.isDeleted = true;
    this.wishlist = this.wishlist.filter(x => x.game_ID != wishlist.game_ID);
    //await this.wishlistService.upsertWishlist(wishlist);
    sessionStorage.setItem("wishlist", JSON.stringify(this.wishlist));
    this.updateCartAndWishlist();
    if (this.wishlist.length == 0){
      this.offcanvasWishlist?.hide();
    }
  }

  public checkout(){
    this.router.navigateByUrl("/checkout");
  }
}
