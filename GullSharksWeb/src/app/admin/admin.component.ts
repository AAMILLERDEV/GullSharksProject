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
    this.gameOperation = operation;
    this.gamesModal.toggle();
  }

  public openEventsModal(operation: string){
    this.eventOperation = operation;
    this.eventsModal.toggle();
  }

  public buildModals(){
    this.gamesModal = bootstrap.Modal.getOrCreateInstance('#gamesModal', {keyboard: true});
    this.reviewsModal = bootstrap.Modal.getOrCreateInstance('#reviewsModal', {keyboard: true});
    this.eventsModal = bootstrap.Modal.getOrCreateInstance('#eventsModal', {keyboard: true});
    this.usersReportModal = bootstrap.Modal.getOrCreateInstance('#usersReportModal', {keyboard: true});
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
  }

  public async deleteGame(){

  }

//Inserting New Game/Game Details/Look Up Method
  public async insertGame(){
    if (this.gamesForm.invalid){
      this.toastr.error("Please fill out all form fields to submit.");
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

    this.toastr.success("Success, a new game has been added!");
  }

  public async updateGame(){
    if (this.gamesForm.invalid){
      this.toastr.error("Please fill out all form fields to submit.");
      return;
    }
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

  public updateReview(response: boolean){
    if (this.reviewsForm.invalid){
      this.toastr.error("Please fill out all form fields to submit.");
      return;
    }
  }

  //Insert Plat Game Records
  public async insertPlatGameLookUpRecords(gameDetailsRes: number, platform_ID: number){
    let gamePlatLookUp: PlatformsGamesLookUp = {
      gameDetails_id: gameDetailsRes,
      id: 0,
      isDeleted: false,
      platform_id: platform_ID
    }

    let gamePlatRes = await this.platformService.upsertPlatformGamesLookUp(gamePlatLookUp);

  }

  updateGamesForm(){
      let game = this.games.find(x => x.id == this.gamesForm.controls['gameNameControl'].value);

      if (game == null){
        this.toastr.error("Error, can't find game in list");
        return;
      }



      let gameDetails = this.gameDetailsList.find( x => x.id == game?.gameDetails_ID);

      console.log(gameDetails);

      this.gamesForm.controls['assetControl'].setValue(game.asset_ID);
      this.gamesForm.controls['priceControl'].setValue(game.priceInCAD);
      this.gamesForm.controls['publisherControl'].setValue(gameDetails?.publisher);
      this.gamesForm.controls['categoryControl'].setValue(gameDetails?.category_ID);
      this.gamesForm.controls['descriptionControl'].setValue(gameDetails?.description);
      //this.gamesForm.controls['platformControl'].setValue();

;  }
}