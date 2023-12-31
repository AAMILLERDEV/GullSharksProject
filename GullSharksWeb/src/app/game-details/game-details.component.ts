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
import { GameCategoryService } from 'src/services/gameCategories.service';
import { ReviewsForm } from 'src/form-models/reviews-form';
import { FormGroup } from '@angular/forms';
import { GameReview } from 'src/models/GameReview';
import { GameReviewService } from 'src/services/gameReview.service';
import { PreferenceService } from 'src/services/preference.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit{

  public user?: User;
  public games: Game[] = [];
  public recommendedGames: Game[] = [];
  public game!: Game;
  public gameDetails!: GameDetails[];
  public gameDetail!: GameDetails;
  public reviews: GameReview[] = [];
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
  public gameName: string = "";

  public users: User[] = [];

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
    public gameReviewService: GameReviewService,
    public preferenceService: PreferenceService) {
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
    this.reviews = await this.gameReviewService.getGameReviews();
    this.ratings = await this.ratingService.getRatings();
    this.users = await this.userService.getAllUsers();
    this.ratings = this.ratings.map(x => {
      x.isApproved = this.reviews.find(y => y.rating_ID == x.id)!.isApproved;
      return x;
    });
    this.games.map(x => x.gameDetails = this.gameDetails!.find(y => y.id == x.gameDetail_ID));
    this.games.map(x => x.gameAsset = this.assets.find(z => z.id == x.asset_ID));
    this.games.map(x => x.srcFront = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.src = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.srcBack = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/back.jpg");
    this.games.map(x => {
      x.reviews = this.reviews.filter(y => y.game_ID == x.id && y.isApproved);
    });

    this.game = this.games.find(x => x.id == this.game_ID)!;
    this.gameName = this.game.gameName;

    await this.applyGameRatings();

    this.reviews.map(x => {
      x.username = this.users.find(y => y.id == x.user_ID)?.username;
      x.rating = this.ratings.find(y => y.id == x.rating_ID)?.ratingNumber;
      return x;
    });

    this.platformsForGame = await this.platformService.getPlatformGamesLookUpByGame(this.game_ID);
    this.platforms = await this.platformService.getPlatforms();
    this.platformsForGame.map(x => x.platformName = this.platforms.find(y => y.id == x.platform_ID)?.platformName);

    this.categories = await this.categoryService.GetGameCategories();
    this.gameDetails?.map(x => x.categoryName = this.categories.find(y => y.id == x.category_ID)?.categoryName); 
    await this.relatedGames();
    this.offCanvasReady = true;
    console.log(this.game);
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

  public async relatedGames() {
    let gamePreferenceList: number[] = [];
    let userPref = await this.preferenceService.getCategoryPreferences(this.user!.id);
    gamePreferenceList.push(this.game.gameDetails?.category_ID!);
    
    for (let x of userPref){
      gamePreferenceList.push(x.category_ID);
    }

    for (let x of gamePreferenceList){
      this.recommendedGames.push(this.games.find(y => y.gameDetails!.category_ID == x)!);
    }

    this.recommendedGames = this.games.filter(x => gamePreferenceList.includes(x.gameDetails?.category_ID!) && x.id != this.game!.id)
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
    let ratings = this.ratings.filter(y => y.game_ID == this.game.id && y.isApproved);
    if (ratings == null || ratings.length == 0){
      this.game.rating = 0;
      return;
    }

    let total: number = 0;
    for (let z of ratings){
        total += z.ratingNumber;
    }

    this.game.rating = (total / ratings.length);
  }


  public updateNav(){
    this.navbar.getData();
  }




}

