import { Component, OnInit, ViewChild } from '@angular/core';
import { OffcanvasComponent } from '../offcanvas/offcanvas.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Wishlist } from 'src/models/Wishlist';
import { CartItem } from 'src/models/CartItem';
import { GameDetails } from 'src/models/GameDetails';
import { User } from 'src/models/User';
import { Game } from 'src/models/Game';
import { Asset } from 'src/models/Asset';
import { UserService } from 'src/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GameService } from 'src/services/game.service';
import { GameDetailService } from 'src/services/gameDetails.service';
import { AssetService } from 'src/services/asset.service';
import { CartItemService } from 'src/services/cartItem.service';
import { WishlistService } from 'src/services/wishlist.service';
import { RatingService } from 'src/services/rating.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public user?: User;
  public games: Game[] = [];
  public gameDetails: GameDetails[] = [];
  public assets: Asset[] = [];
  public cartItems: CartItem[] = [];
  public wishlist: Wishlist[] = [];

  public viewReady: boolean = false;
  public offCanvasReady: boolean = false;

  @ViewChild(OffcanvasComponent) offcanvas!: OffcanvasComponent;
  @ViewChild(NavbarComponent) navbar!: NavbarComponent;

  constructor (public userService: UserService,
    public toastr: ToastrService,
    public router: Router,
    public gameService: GameService,
    public gameDetailService: GameDetailService,
    public assetService: AssetService,
    public cartItemService: CartItemService,
    public wishlistService: WishlistService,
    public ratingService: RatingService) {

  }

  async ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("User")!);

    if (!this.user){
      this.router.navigateByUrl("login");
    }

    await this.getGameData();
    this.viewReady = true;
    this.offCanvasReady = true;
    this.offcanvas.toggleCanvas();
  }

  public openOffCanvas(){
    this.offcanvas.showCanvas();
  }

  public async getGameData(){
    this.games = await this.gameService.getGames();
    this.gameDetails = await this.gameDetailService.getGameDetails();
    this.assets = await this.assetService.getAssets();
    this.games.map(x => x.gameDetails = this.gameDetails.find(y => y.id == x.gameDetail_ID));
    this.games.map(x => x.gameAsset = this.assets.find(z => z.id == x.asset_ID));
    this.games.map(x => x.srcFront = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.src = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.srcBack = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/back.jpg");
    this.cartItems = JSON.parse(sessionStorage.getItem("cart")!);
    //this.cartItems = await this.cartItemService.getCartItemsByUserID(this.user!.id);
    this.cartItems.map(x => x.game == this.games.find(y => y.id == x.game_ID));
  }

  public updateNav(){
    this.navbar.getData();
  }

  public toggleOffCanvas(){
    this.offcanvas.toggleCanvas();
  }

  public async removeFromCart(cart: CartItem){
    this.offcanvas.deleteCartItem(cart);
    this.cartItems.filter(x => x.id != cart.id);
  }

  public calculateCanadianTax(amount: number, provinceTerritoryAB: string) {

    const taxRates: { [province: string]: number } = {
      AB: 1.05, // Alberta
      BC: 1.07, // British Columbia
      MB: 1.08, // Manitoba
      NB: 1.15, // New Brunswick
      NL: 1.15, // Newfoundland and Labrador
      NS: 1.15, // Nova Scotia
      NT: 1.05, // Northwest Territories
      NU: 1.05, // Nunavut
      ON: 1.13, // Ontario
      PE: 1.15, // Prince Edward Island
      QC: 1.14975, // Quebec
      SK: 1.06, // Saskatchewan
      YT: 1.05, // Yukon
    };
  
    // Check if the provided province/territory ID is valid
    if (taxRates.hasOwnProperty(provinceTerritoryAB)) {      
      return (amount * taxRates[provinceTerritoryAB]);

    } else {
      return console.log('Invalid province/territory ID');
    }
  }

}
