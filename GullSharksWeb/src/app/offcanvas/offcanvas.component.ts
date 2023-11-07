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

  public offCanvasReady: boolean = false;
  public test: string = '';

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

  async ngOnInit() {

    await this.updateCartAndWishlist();
    this.offcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasScrolling")!, {backdrop: false});
    this.offcanvasWishlist = new bootstrap.Offcanvas(document.getElementById("offcanvasScrollingWishlist")!, {backdrop: false});
    this.offCanvasReady = true;

  }

  public async setupOffcanvas(){
    this.wishlist = await this.wishlistService.getWishlistByUserID(this.user!.id);
    if (this.wishlist){
      this.wishlist = this.wishlist.map(x => {
        x.game = this.games.find(y => y.id == x.game_ID)!;
        return x;
      });
    }
    this.cartItems = await this.cartItemService.getCartItemsByUserID(this.user!.id);
    if (this.cartItems){
      this.cartItems = this.cartItems.map(x => {
        x.game = this.games.find(y => y.id == x.game_ID);
        return x;
      });
    }
  }

  public async updateCartAndWishlist(){
    await this.setupOffcanvas();
    this.updateSignal.emit();
  }

  public toggleCanvas(){
    this.offcanvasWishlist!.hide();
    this.offcanvas!.toggle();
  }

  public showCanvas(){
    this.offcanvas!.show();
  }

  public toggleCanvasWishlist(){
    this.offcanvas!.hide();
    this.offcanvasWishlist!.toggle();
  }

  public showCanvasWishlist(){
    this.offcanvasWishlist!.show();
  }

  public async addToCart(game: Game){
    this.offcanvasWishlist?.hide();
    this.showCanvas();

    if (this.cartItems!= null && this.cartItems.find(x => x.game_ID == game.id)){
      let cartItem = this.cartItems.find(x => x.game_ID == game.id);
      this.cartItems = this.cartItems.map(x => {if (x.game_ID == game.id){
        x.subtotal = x.subtotal + game.priceInCAD;
        x.quantity++;
      } return x;});

      await this.cartItemService.upsertCartItem(cartItem!);
      await this.updateCartAndWishlist();
      return;
    }

    let cartItem: CartItem = {
      game_ID: game.id, 
      id: 0, 
      isDeleted: false, 
      quantity: 1, 
      subtotal: game.priceInCAD, 
      total: 0, 
      user_ID: this.user!.id, 
      game: game
    };

    this.cartItems.push(cartItem)
    await this.cartItemService.upsertCartItem(cartItem);
    await this.updateCartAndWishlist();
  }

  public async addItemToWishlist(game: Game){
    this.offcanvas?.hide();
    this.showCanvasWishlist();

    if (this.wishlist != null && this.wishlist.find(x => x.game_ID == game.id)){
      let wishListItem = this.wishlist.find(x => x.game_ID == game.id);
      this.wishlist = this.wishlist.map(x => {if (x.game_ID == game.id){
        x.quantity++;
      } return x;});

      await this.wishlistService.upsertWishlist(wishListItem!);
      await this.updateCartAndWishlist();
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
    await this.wishlistService.upsertWishlist(wishlistItem);
    await this.updateCartAndWishlist();
  }

  public async deleteCartItem(cartItem: CartItem){
    cartItem.isDeleted = true;
    this.cartItems = this.cartItems.filter(x => x.game_ID != cartItem.game_ID);
    await this.cartItemService.upsertCartItem(cartItem);
    await this.updateCartAndWishlist();
    if (this.cartItems.length == 0){
      this.offcanvas?.hide();
    }
  }

  public async deleteWishlistItem(wishlist: Wishlist){
    wishlist.isDeleted = true;
    this.wishlist = this.wishlist.filter(x => x.game_ID != wishlist.game_ID);
    await this.wishlistService.upsertWishlist(wishlist);
    await this.updateCartAndWishlist();
    if (this.wishlist.length == 0){
      this.offcanvasWishlist?.hide();
    }
  }


  public checkout(){
    this.router.navigateByUrl("/checkout");
  }
}
