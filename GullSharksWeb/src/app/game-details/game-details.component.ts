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
import { GameRecommendationsComponent } from '../game-recommendations/game-recommendations.component';
import { ReviewsForm } from 'src/form-models/reviews-form';
import { FormGroup } from '@angular/forms';
import { GameReview } from 'src/models/GameReview';
import { GameReviewService } from 'src/services/gameReview.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit{

  public user?: User;
  public games: Game[] = [];
  public game!: Game;
  public gameDetails!: GameDetails[];
  public gameDetail!: GameDetails;

  public game_ID: number = 0;

  public assets: Asset[] = [];
  public cartItems: CartItem[] = [];
  public wishlist: Wishlist[] = [];
  public readyGames: Game[] = [];
  public ratings: Ratings[] = [];
  public platforms: Platform[] = [];
  public platformsForGame: PlatformsGamesLookUp[] = [];
  public categories: GameCategory[] = [];
  public categoryForGame?: GameCategory;

  public viewReady: boolean = false;
  public offCanvasReady: boolean = false;

  public reviewsForm: FormGroup;


  public reviewsModal!: bootstrap.Modal;

  @ViewChild(OffcanvasComponent) offcanvas!: OffcanvasComponent;
  @ViewChild(NavbarComponent) navbar!: NavbarComponent;

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
    public ratingService: RatingService,
    public gameReviewService: GameReviewService) {
      this.offCanvasReady = true;
      this.reviewsForm = ReviewsForm;
  }

  public async ngOnInit(){
    this.user = JSON.parse(sessionStorage.getItem("User")!);

    if (!this.user){
      this.router.navigateByUrl("login");
    }

    this.route.paramMap.subscribe(params => {
      const gameId = params.get('id');
      if (gameId !== null) {
        this.game_ID = parseInt(gameId);
      } else {
        // Handle the case where gameId is null
        // Perhaps redirect back to home or show an error message
        console.error('No game ID provided in route');
        // Optionally navigate back to a safe route
        this.router.navigate(['/']);
      }
    });

    this.reviewsModal = bootstrap.Modal.getOrCreateInstance('#reviewsModal', {keyboard: true});
    await this.getGameData();
    this.viewReady = true;
  }

  public async getGameData(){
    this.games = await this.gameService.getGames();
    this.gameDetails = await this.gameDetailService.getGameDetails();
    this.assets = await this.assetService.getAssets();
    this.ratings = await this.ratingService.getRatings();
    this.games.map(x => x.gameDetails = this.gameDetails!.find(y => y.id == x.gameDetail_ID));
    this.games.map(x => x.gameAsset = this.assets.find(z => z.id == x.asset_ID));
    this.games.map(x => x.srcFront = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.src = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.srcBack = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/back.jpg");
    this.game = this.games.find(x => x.id == this.game_ID)!;
    this.applyGameRatings();

    this.platformsForGame = await this.platformService.getPlatformGamesLookUpByGame(this.game_ID);
    this.platforms = await this.platformService.getPlatforms();
    this.platformsForGame.map(x => x.platformName = this.platforms.find(y => y.id == x.platform_ID)?.platformName);

    this.categories = await this.categoryService.GetGameCategories();
    this.gameDetails?.map(x => x.categoryName = this.categories.find(y => y.id == x.category_ID)?.categoryName); 
    this.offCanvasReady = true;
  }

  public async addReview(game: Game){
    this.reviewsForm.controls['gameControl'].setValue(game.gameName);
    this.reviewsModal.toggle();
  }

  public async upsertReview(){
    if (this.reviewsForm.invalid){
      this.toastr.error("Please fill out all form fields.");
      return;
    }

    let rating: Ratings = {
      game_ID: this.game.id,
      id: 0,
      isDeleted: false,
      ratingNumber: this.reviewsForm.controls['ratingControl'].value,
      user_ID: this.user!.id
    };

    let ratingRes = await this.ratingService.upsertRating(rating);

    let gameReview: GameReview = {
      dateAdded: new Date(),
      description: this.reviewsForm.controls['descriptionControl'].value,
      game_ID: this.game.id,
      id: 0,
      isApproved: false,
      isDeleted: false,
      rating_ID: ratingRes,
      user_ID: this.user!.id
    };

    let gameRevRes = await this.gameReviewService.upsertGameReview(gameReview);

    if (gameRevRes > 0){
      await this.applyGameRatings();
      this.toastr.success("Thank you for your review!");
      this.reviewsModal.toggle();
      this.reviewsForm.reset();
      return;
    }

    this.toastr.error("Could not save. Error.");
    return;
  }

  public closeReviewModal(){
    this.reviewsModal.toggle();
  }

  public async relatedGames(gameId: number) {

    this.games = await this.gameService.getGames();
    this.games.map(x => x.gameAsset = this.assets.find(z => z.id == x.asset_ID));
    this.games.map(x => x.srcFront = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.src = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.srcBack = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/back.jpg");

    this.gameDetails = await this.gameDetailService.getGameDetails();
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


  public async applyGameRatings(){
    this.ratings = await this.ratingService.getRatings();
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

