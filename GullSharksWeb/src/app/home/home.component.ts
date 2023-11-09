import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
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
import { OffcanvasComponent } from '../offcanvas/offcanvas.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RatingService } from 'src/services/rating.service';
import { Ratings } from 'src/models/Ratings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  public user?: User;
  public games: Game[] = [];
  public gameDetails: GameDetails[] = [];
  public assets: Asset[] = [];
  public cartItems: CartItem[] = [];
  public wishlist: Wishlist[] = [];
  public readyGames: Game[] = [];
  public ratings: Ratings[] = [];
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


  public async ngOnInit(){
    this.user = JSON.parse(sessionStorage.getItem("User")!);

    if (!this.user){
      this.router.navigateByUrl("login");
    }

    await this.getGameData();
    this.offCanvasReady = true;
    this.viewReady = true;
  }

  public applyGameRatings(){
    for (let x of this.games){
      let ratings = this.ratings.filter(y => y.game_ID == x.id);
      console.log(ratings);
      if (ratings == null || ratings.length == 0){
        x.rating = 0;
        continue;
      }
  
      let total: number = 0;
      for (let z of ratings){
          total += z.ratingNumber;
      }
      x.rating = (total / ratings.length);
      x.textColor = this.ratingColors(x.rating);
    }

  }

  public ratingColors(num: number){
    if (num <= 50){
      return "text-secondary";
    } else if (num > 50 && num <= 75){
      return "text-warning";
    } else {
      return "text-success";
    }
  }

  public updateNav(){
    this.navbar.getData();
  }

  public filterGames(val: string){
    this.readyGames = this.games.filter(x => x.gameName.toLowerCase().includes(val.toLowerCase()));
  }

  public async getGameData(){
    this.games = await this.gameService.getGames();
    this.gameDetails = await this.gameDetailService.getGameDetails();
    this.assets = await this.assetService.getAssets();
    this.ratings = await this.ratingService.getRatings();
    this.games.map(x => x.gameDetails = this.gameDetails.find(y => y.id == x.gameDetail_ID));
    this.games.map(x => x.gameAsset = this.assets.find(z => z.id == x.asset_ID));
    this.games.map(x => x.srcFront = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.src = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.srcBack = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/back.jpg");
    this.applyGameRatings();
    this.readyGames = this.games;
    console.log(this.games);
  }



  public openOffCanvas(){
    this.offcanvas.showCanvas();
  }

  public toggleOffCanvas(){
    this.offcanvas.toggleCanvas();
  }

  toggleWishlistOffCanvas(){
    this.offcanvas.toggleCanvasWishlist();
  }

  public async addItemToWishlist(game: Game){
    this.offcanvas.addItemToWishlist(game);
    this.navbar.getData();
  }

  public async addToCart(game: Game){
    this.offcanvas.addToCart(game);
    this.navbar.getData();
  }

}
