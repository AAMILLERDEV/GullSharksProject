import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EventsForm } from 'src/form-models/events-form';
import { GamesForm } from 'src/form-models/games-form';
import { PreferencesForm } from 'src/form-models/preferences-form';
import { ReviewsForm } from 'src/form-models/reviews-form';
import { Asset } from 'src/models/Asset';
import { Events } from 'src/models/Events';
import { Game } from 'src/models/Game';
import { GameCategory } from 'src/models/GameCategory';
import { GameDetails } from 'src/models/GameDetails';
import { GameReview } from 'src/models/GameReview';
import { Platform } from 'src/models/Platform';
import { PlatformsGamesLookUp } from 'src/models/PlatformsGamesLookUp';
import { Ratings } from 'src/models/Ratings';
import { User } from 'src/models/User';
import { AssetService } from 'src/services/asset.service';
import { EventService } from 'src/services/events.service';
import { GameService } from 'src/services/game.service';
import { GameCategoryService } from 'src/services/gameCategories.service';
import { GameDetailService } from 'src/services/gameDetails.service';
import { GameReviewService } from 'src/services/gameReview.service';
import { PlatformService } from 'src/services/platform.service';
import { RatingService } from 'src/services/rating.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public gamesForm: FormGroup;
  public reviewsForm: FormGroup;
  public eventsForm: FormGroup;

  public users: User[] = [];
  public games: Game[] = [];
  public assets: Asset[] = [];
  public platforms: Platform[] = [];
  public eventList: Events[] = [];
  public reviewsList: GameReview[] = [];
  public gameCategories: GameCategory[] = [];
  public gameDetailsList: GameDetails[] = [];
  public ratingsList: Ratings[] = [];

  public selectedGame?: Game;
  public selectedGameDetails?: GameDetails;
  public selectedPlatforms!: PlatformsGamesLookUp[];
  public selectedReview?: GameReview;

  public approved: boolean = false;

  public user!: User | undefined;

  public loginCounter: number = 0;

  public gamesModal!: bootstrap.Modal;
  public reviewsModal!: bootstrap.Modal;
  public eventsModal!: bootstrap.Modal;
  public usersReportModal!: bootstrap.Modal;

  //template strings
  public gameOperation: string = 'Add';
  public eventOperation: string = 'Add';

  constructor(public router: Router,
    public userService: UserService,
    public toastr: ToastrService,
    public platformService: PlatformService,
    public eventSerivce: EventService,
    public ratingService: RatingService,
    public gameService: GameService,
    public gameDetailService: GameDetailService,
    public gameCategoryService: GameCategoryService,
    public assetService: AssetService,
    public reviewService: GameReviewService){
    this.gamesForm = GamesForm;
    this.reviewsForm = ReviewsForm;
    this.eventsForm = EventsForm;
  }

  public async ngOnInit() {
    this.users = await this.userService.getAllUsers();
    this.user = JSON.parse(sessionStorage.getItem("User")!);


    if (this.user && !this.user.isAdmin){
      this.router.navigateByUrl("home");
    }

    await this.getData();
    this.buildModals();
    console.log(this.games);
  }

  public openGamesModal(operation: string){
    this.gamesForm.reset();
    this.gameOperation = operation;
    this.gamesModal.toggle();
  }

  public openEventsModal(operation: string){
    this.eventOperation = operation;
    this.eventsModal.toggle();
  }

  public clearReviewsModal(){
    this.reviewsForm.reset();
    this.resetReviewsFormButtons();
    this.reviewsForm.controls['approveControl'].enable();
    this.reviewsForm.controls['rejectControl'].enable();
    this.approved = false;
  }

  public buildModals(){
    this.gamesModal = bootstrap.Modal.getOrCreateInstance('#gamesModal', {keyboard: true});
    this.reviewsModal = bootstrap.Modal.getOrCreateInstance('#reviewsModal', {keyboard: true});
    this.eventsModal = bootstrap.Modal.getOrCreateInstance('#eventsModal', {keyboard: true});
    this.usersReportModal = bootstrap.Modal.getOrCreateInstance('#usersReportModal', {keyboard: true});
    this.reviewsForm.disable();
    this.reviewsForm.controls['reviewsListControl'].enable();
    this.reviewsForm.controls['approveControl'].enable();
    this.reviewsForm.controls['rejectControl'].enable();
  }
  
  public clearForms(){
    this.gamesForm.reset();
  }

  public showReport(){
    this.usersReportModal.toggle();
  }

  public async getData(){
    this.gameCategories = await this.gameCategoryService.GetGameCategories();
    this.platforms = await this.platformService.getPlatforms();
    this.assets = await this.assetService.getAssets();
    this.games = await this.gameService.getGames();
    this.gameDetailsList = await this.gameDetailService.getGameDetails();
    this.eventList = await this.eventSerivce.getEvents();
    this.reviewsList = await this.reviewService.getGameReviews();
    this.ratingsList = await this.ratingService.getRatings();

    if (this.reviewsList != null && this.reviewsList.length > 0){
      for (let i of this.reviewsList){
        i.review_name = `User: ${i.user_ID} - Date Added: ${i.dateAdded} - Game: ${i.game_ID}`;
      }
    }
  }

  public async deleteGame(){
    await this.gameService.deleteGame(this.selectedGame!.id, this.selectedGameDetails!.id);
    await this.getData();
    this.toastr.success("Success, game deleted.");
    return;
  }

//Inserting New Game/Game Details/Look Up Method
  public async insertGame(){
    if (this.gamesForm.invalid){
      this.toastr.error("Please fill out all form fields to submit.");
      return;
    }

    if (this.gamesForm.controls['gameNameControl'].value != null && this.games.find(x => x.gameName == this.gamesForm.controls['gameNameControl'].value)){
      this.toastr.error("A game with that name already exists.");
      return;
    }    

    let game: Game = {
      id: 0,
      gameDetails_ID: 0,
      asset_ID: this.gamesForm.controls['assetControl'].value,
      gameName: this.gamesForm.controls['gameNameControl'].value,
      priceInCAD: this.gamesForm.controls['priceControl'].value,
      isDeleted: false
    }

    let res = await this.gameService.upsertGame(game);

    //If our API does not successfully insert a game
    if (res < 1){
      this.toastr.error("Error, failed to insert game.");
      return;
    }

    let gameDetails: GameDetails = {
      id: 0,
      category_ID: this.gamesForm.controls['categoryControl'].value,
      description: this.gamesForm.controls['descriptionControl'].value,
      publisher: this.gamesForm.controls['publisherControl'].value,
      isDeleted: false
    }

    let gameDetailsRes = await this.gameDetailService.upsertGameDetails(gameDetails);

    if (res < 1){
      this.toastr.error("Error, failed to insert game details.");
      return;
    }

    game.gameDetails_ID = gameDetailsRes;
    game.id = res;

    let gameUpdateRes = await this.gameService.upsertGame(game);

    if (gameUpdateRes != res){
      this.toastr.error("Error, failed to update game with details ID.");
      return;
    }

    let platforms = this.gamesForm.controls['platformControl'].value;

    for (let i of platforms){
      await this.insertPlatGameLookUpRecords(gameDetailsRes, i);
    }
    
    await this.getData();
    this.toastr.success("Success, a new game has been added!");
  }


//Method used for updating games
  public async updateGame(){
    if (this.gamesForm.invalid){
      this.toastr.error("Please fill out all form fields to submit.");
      return;
    }

    this.selectedGame!.priceInCAD = this.gamesForm.controls['priceControl'].value;
    this.selectedGame!.asset_ID = this.gamesForm.controls['assetControl'].value;
    this.selectedGameDetails!.publisher = this.gamesForm.controls['publisherControl'].value;
    this.selectedGameDetails!.description = this.gamesForm.controls['descriptionControl'].value;
    this.selectedGameDetails!.category_ID = this.gamesForm.controls['categoryControl'].value;

    await this.gameService.upsertGame(this.selectedGame!);
    await this.gameDetailService.upsertGameDetails(this.selectedGameDetails!);

    let platforms  = this.gamesForm.controls['platformControl'].value;

    for (let i of platforms){
      if (this.selectedPlatforms.find(x => x.platform_ID == i) == null){
        await this.insertPlatGameLookUpRecords(this.selectedGameDetails!.id, i);
      }
    }

    for (let i of this.selectedPlatforms){
      if (platforms.find((x: number) => x == i.platform_ID) == null){
        i.isDeleted = true;
        await this.platformService.upsertPlatformGamesLookUp(i);
      }
    }

    await this.getData();
    this.toastr.success("Success, game updated!");
    this.gamesForm.reset();
    this.reviewsForm.reset();
    this.resetReviewsFormButtons();
  }

  public async insertEvent(){
    if (this.eventsForm.invalid){
      this.toastr.error("Please fill out all form fields to submit.");
      return;
    }
  }

  public async updateEvent(){
    if (this.gamesForm.invalid){
      this.toastr.error("Please fill out all form fields to submit.");
      return;
    }
  }

  public async updateReview(response: boolean){
    if (this.reviewsForm.invalid){
      this.toastr.error("Please fill out all form fields to submit.");
      return;
    }

    if (response == true){
      this.selectedReview!.isApproved = true;
    } else {
      this.selectedReview!.isApproved = false;
      this.selectedReview!.isDeleted = true;
    }

    await this.reviewService.upsertGameReview(this.selectedReview!);
    await this.getData();
    this.toastr.success("Success, the review has been updated.");
  }

  //Insert Plat Game Records
  public async insertPlatGameLookUpRecords(gameDetailsRes: number, platform_ID: number){
    let gamePlatLookUp: PlatformsGamesLookUp = {
      gameDetails_ID: gameDetailsRes,
      id: 0,
      isDeleted: false,
      platform_ID: platform_ID
    }
    let gamePlatRes = await this.platformService.upsertPlatformGamesLookUp(gamePlatLookUp);
  }

//Updates Games Form when review is selected
  public async updateGamesForm(){
      this.selectedGame = this.games.find(x => x.id == this.gamesForm.controls['gameNameControl'].value);

      if (this.selectedGame == null){
        return;
      }

      this.selectedGameDetails = this.gameDetailsList.find( x => x.id == this.selectedGame?.gameDetails_ID);

      this.gamesForm.controls['assetControl'].setValue(this.selectedGame.asset_ID);
      this.gamesForm.controls['priceControl'].setValue(this.selectedGame.priceInCAD);
      this.gamesForm.controls['publisherControl'].setValue(this.selectedGameDetails?.publisher);
      this.gamesForm.controls['categoryControl'].setValue(this.selectedGameDetails?.category_ID);
      this.gamesForm.controls['descriptionControl'].setValue(this.selectedGameDetails?.description);

      this.selectedPlatforms = await this.platformService.getPlatformGamesLookUpByGame(this.selectedGame.gameDetails_ID);
      let platList = [];

      for (let i of this.selectedPlatforms){
        platList.push(i.platform_ID);
      }

      this.gamesForm.controls['platformControl'].setValue(platList);
    }

    //Updates Reviews Form when review is selected
  public async updateReviewsForm(val: any){
    this.selectedReview = this.reviewsList.find(x => x.id == val);

    if (this.selectedReview == null){
      return;
    }

    this.approved = this.selectedReview.isApproved;

    let rating = this.ratingsList.find(x => x.id == this.selectedReview?.rating_ID)?.ratingNumber;
    
    this.reviewsForm.controls['gameControl'].setValue(this.selectedReview?.game_ID);
    this.reviewsForm.controls['descriptionControl'].setValue(this.selectedReview?.description);
    this.reviewsForm.controls['ratingControl'].setValue(rating);

    if (this.selectedReview?.isApproved){
      this.reviewsForm.controls['approveControl'].disable();
      this.reviewsForm.controls['rejectControl'].disable();
    }
  }

  public resetReviewsFormButtons(){
    this.reviewsForm.controls['rejectControl'].setValue("Reject");
    this.reviewsForm.controls['approveControl'].setValue("Approve");
  }
}