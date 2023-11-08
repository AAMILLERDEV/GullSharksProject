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
import { PlatformService } from 'src/services/platform.service';
import { OffcanvasComponent } from '../offcanvas/offcanvas.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RatingService } from 'src/services/rating.service';
import { Ratings } from 'src/models/Ratings';
import { ActivatedRoute } from '@angular/router';
import { Platform } from 'src/models/Platform';
import { PlatformsGamesLookUp } from 'src/models/PlatformsGamesLookUp';
import { GameCategory } from 'src/models/GameCategory';
import { CategoryPreference } from 'src/models/CategoryPreference';
import { GameCategoryService } from 'src/services/gameCategories.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit{

  public user?: User;
  public games: Game[] = [];
  public gameDetails: GameDetails[] = [];
  public assets: Asset[] = [];
  public cartItems: CartItem[] = [];
  public wishlist: Wishlist[] = [];
  public readyGames: Game[] = [];
  public ratings: Ratings[] = [];
  public platforms: Platform[] = [];
  public platformLookUp: PlatformsGamesLookUp[] = [];
  public categories: GameCategory[] = [];
  public viewReady: boolean = false;

  public gameName: Game[] = [];

  public asset_ID: Game[] = [];

  public offCanvasReady: boolean = false;

  @ViewChild(OffcanvasComponent) offcanvas!: OffcanvasComponent;
  @ViewChild(NavbarComponent) navbar!: NavbarComponent;

  //public gameDetail
  //asset_ID: number;
  //gameDetail_ID: number;
  //priceInCAD: number;

  constructor (public userService: UserService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public router: Router,
    public gameService: GameService,
    public gameDetailService: GameDetailService,
    public assetService: AssetService,
    public cartItemService: CartItemService,
    public wishlistService: WishlistService,
    public platformService: PlatformService,
    public categoryService: GameCategoryService,
    public ratingService: RatingService) {

  }

  public async ngOnInit(){

    this.route.paramMap.subscribe(params => {
      const gameId = params.get('id');
      if (gameId !== null) {
        // Convert gameId to number and call getGame
        this.getGame(+gameId);
      } else {
        // Handle the case where gameId is null
        // Perhaps redirect back to home or show an error message
        console.error('No game ID provided in route');
        // Optionally navigate back to a safe route
        this.router.navigate(['/']);
      }
    });


  }

  public async setGame(){

  }

  public async getGame(gameId: number) {

    this.games = await this.gameService.getGames();
    this.games = this.games.filter(games => games.id === gameId);
    this.gameDetails = await this.gameDetailService.getGameDetails();
    this.gameDetails = this.gameDetails.filter(gameDetail => gameDetail.id === gameId);
    this.assets = await this.assetService.getAssets();
    this.ratings = await this.ratingService.getRatings();
    this.games.map(x => x.gameDetails = this.gameDetails.find(y => y.id == x.gameDetail_ID));
    this.games.map(x => x.gameAsset = this.assets.find(z => z.id == x.asset_ID));
    this.games.map(x => x.srcFront = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.src = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.srcBack = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/back.jpg");
    this.applyGameRatings();



    this.getPlatform(gameId);

    this.getCategory(gameId);

    this.readyGames = this.games;
  }

  public async getPlatform(gameId: number){

    this.platformLookUp = await this.platformService.getPlatformGamesLookUpByGame(gameId);
    const allPlatforms: Platform[] = await this.platformService.getPlatforms();

    this.platforms = allPlatforms.filter((platform: Platform) =>
      this.platformLookUp.some((lookupItem: PlatformsGamesLookUp) => lookupItem.platform_ID === platform.id)
    );

}

  public async getCategory(gameId: number){

    this.gameDetails = await this.gameDetailService.getGameDetails();
    this.gameDetails = this.gameDetails.filter(gameDetail => gameDetail.id === gameId);

  if (!this.gameDetails || this.gameDetails.length === 0) {
    console.error('No game details found for gameId:', gameId);
    return;
  }

  const gameDetail = this.gameDetails[0]; // Assuming there's only one gameDetail for a gameId
  const categoryID = gameDetail.category_ID;

  const allCategories: GameCategory[] = await this.categoryService.GetGameCategories();

  this.categories = allCategories.filter((category: GameCategory) =>
    category.id === categoryID
  );


  }

  public async relatedGames(gameId: number) {

    this.games = await this.gameService.getGames();
    this.games.map(x => x.gameAsset = this.assets.find(z => z.id == x.asset_ID));
    this.games.map(x => x.srcFront = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.src = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.srcBack = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/back.jpg");

    this.gameDetails = await this.gameDetailService.getGameDetails();
  }


  public async addItemToWishlist(game: Game){
    this.offcanvas.addItemToWishlist(game);
  }

  public async addToCart(game: Game){
    this.offcanvas.addToCart(game);
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
}

