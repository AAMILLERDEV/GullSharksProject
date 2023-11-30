import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EventsForm } from 'src/form-models/events-form';
import { GamesForm } from 'src/form-models/games-form';
import { OrdersForm } from 'src/form-models/orders-form';
import { PreferencesForm } from 'src/form-models/preferences-form';
import { ReviewsForm } from 'src/form-models/reviews-form';
import { Asset } from 'src/models/Asset';
import { Events } from 'src/models/Events';
import { Game } from 'src/models/Game';
import { GameCategory } from 'src/models/GameCategory';
import { GameDetails } from 'src/models/GameDetails';
import { GameReview } from 'src/models/GameReview';
import { Order } from 'src/models/Order';
import { OrderDetail } from 'src/models/OrderDetail';
import { PaymentDetail } from 'src/models/PaymentDetail';
import { Platform } from 'src/models/Platform';
import { PlatformsGamesLookUp } from 'src/models/PlatformsGamesLookUp';
import { Ratings } from 'src/models/Ratings';
import { ShippingAddress } from 'src/models/ShippingAddress';
import { User } from 'src/models/User';
import { AssetService } from 'src/services/asset.service';
import { EventService } from 'src/services/events.service';
import { GameService } from 'src/services/game.service';
import { GameCategoryService } from 'src/services/gameCategories.service';
import { GameDetailService } from 'src/services/gameDetails.service';
import { GameReviewService } from 'src/services/gameReview.service';
import { OrderService } from 'src/services/order.service';
import { OrderDetailService } from 'src/services/orderDetails.service';
import { PaymentDetailsService } from 'src/services/paymentDetail.service';
import { PlatformService } from 'src/services/platform.service';
import { RatingService } from 'src/services/rating.service';
import { ShippingAddressService } from 'src/services/shippingAddress.service';
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
  public ordersForm: FormGroup;

  public users: User[] = [];
  public games: Game[] = [];
  public assets: Asset[] = [];
  public platforms: Platform[] = [];
  public eventList: Events[] = [];
  public reviewsList: GameReview[] = [];
  public gameCategories: GameCategory[] = [];
  public gameDetailsList: GameDetails[] = [];
  public ratingsList: Ratings[] = [];
  public shippingAddress: ShippingAddress[] = [];

  public orders: Order[] = [];
  public orderDetails: OrderDetail[] = [];
  public paymentDetails: PaymentDetail[] = [];

  public selectedGame?: Game;
  public selectedGameDetails?: GameDetails;
  public selectedPlatforms!: PlatformsGamesLookUp[];
  public selectedReview?: GameReview;
  public selectedEvent!: Events;

  public approved: boolean = false;

  public user!: User | undefined;

  public viewReady: boolean = false;

  public loginCounter: number = 0;

  public gamesModal!: bootstrap.Modal;
  public reviewsModal!: bootstrap.Modal;
  public eventsModal!: bootstrap.Modal;
  public ordersModal!: bootstrap.Modal;

  public usersReportModal!: bootstrap.Modal;
  public userDetailsReportModal!: bootstrap.Modal;
  public gameReportModal!: bootstrap.Modal;
  public gameDetailsReportModal!: bootstrap.Modal;
  public salesReportModal!: bootstrap.Modal;
  public wishlistReportModal!: bootstrap.Modal;


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
    public reviewService: GameReviewService,
    private orderService: OrderService,
    private paymentDetailService: PaymentDetailsService,
    private orderDetailService: OrderDetailService,
    private shippingService: ShippingAddressService){
    this.gamesForm = GamesForm;
    this.reviewsForm = ReviewsForm;
    this.eventsForm = EventsForm;
    this.ordersForm = OrdersForm;
  }

  public async ngOnInit() {
    this.users = await this.userService.getAllUsers();
    this.user = JSON.parse(sessionStorage.getItem("User")!);


    if (this.user && !this.user.isAdmin){
      this.router.navigateByUrl("home");
    }

    await this.getData();
    this.buildModals();
    this.viewReady = true;
  }

  public async openGamesModal(operation: string){
    this.gamesForm.reset();
    this.gameOperation = operation;

    if (operation == "Add"){
      this.assets = this.assets.filter(x => !this.games.find(y => y.asset_ID == x.id));
    }else {
      this.assets = await this.assetService.getAssets();
    }

    this.gamesModal.toggle();
  }

  public openEventsModal(operation: string){
    this.eventOperation = operation;
    this.eventsModal.toggle();
  }

  public openOrdersModal(){
    this.ordersForm.controls['isConfirmedControl'].enable();
    this.ordersModal.toggle();
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
    this.userDetailsReportModal = bootstrap.Modal.getOrCreateInstance('#userDetailsReportModal', {keyboard: true});
    this.gameReportModal = bootstrap.Modal.getOrCreateInstance('#gameReportModal', {keyboard: true});
    this.gameDetailsReportModal = bootstrap.Modal.getOrCreateInstance('#gameDetailsReportModal', {keyboard: true});
    this.wishlistReportModal = bootstrap.Modal.getOrCreateInstance('#wishlistReportModal', {keyboard: true});
    this.salesReportModal = bootstrap.Modal.getOrCreateInstance('#salesReportModal', {keyboard: true});
    this.ordersModal = bootstrap.Modal.getOrCreateInstance('#ordersModal', {keyboard: true});
    this.reviewsForm.disable();
    this.reviewsForm.controls['reviewsListControl'].enable();
    this.reviewsForm.controls['approveControl'].enable();
    this.reviewsForm.controls['rejectControl'].enable();
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


    this.orders = await this.orderService.getOrders();
    if (this.orders != null && this.orders.length > 0){
      for (let x of this.orders){
        this.paymentDetails = await this.paymentDetailService.getPaymentDetails(x.user_ID);
        x.orderDetails = await this.orderDetailService.getOrderDetailsByID(x.id);
        x.shippingAddress = await this.shippingService.getShippingAddress(x.user_ID);
        x.paymentDetails = this.paymentDetails.find(y => y.order_ID == x.id);
        x.orderName = this.games.find(y => y.id == x.game_ID)?.gameName + " - " + x.orderDetails?.dateCreated.toLocaleString().substring(0, 10);
      }
    }

    this.gamesForm.reset();
    this.reviewsForm.reset();
    this.eventsForm.reset();

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

    if (this.gamesForm.controls['gameNameControl'].value != this.assets.find(x => x.id == this.gamesForm.controls['assetControl'].value)?.assetName){
      this.toastr.error("Game name must match asset name.");
      return;
    }

    if (this.gamesForm.controls['gameNameControl'].value != null && this.games.find(x => x.gameName == this.gamesForm.controls['gameNameControl'].value)){
      this.toastr.error("A game with that name already exists.");
      return;
    }    

    let game: Game = {
      id: 0,
      gameDetail_ID: 0,
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

    game.gameDetail_ID = gameDetailsRes;
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
    this.assets = this.assets.filter(x => !this.games.find(y => y.asset_ID == x.id));
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
    this.resetReviewsFormButtons();
  }

  //Insert New Events Method
  public async insertEvent(){
    if (this.eventsForm.invalid){
      this.toastr.error("Please fill out all form fields to submit.");
      return;
    }

    let today = new Date();

    if (new Date(this.eventsForm.controls['endDateControl'].value) < today){
      this.toastr.error("End date cannot be a past date.");
      return;
    }

    if (new Date(this.eventsForm.controls['startDateControl'].value) < today){
      this.toastr.error("Start date must be a future date.");
      return;
    }

    if (new Date(this.eventsForm.controls['startDateControl'].value) > new Date(this.eventsForm.controls['endDateControl'].value)){
      this.toastr.error("Start date must be before the end date.");
      return;
    }

    let event: Events = {
      id: 0,
      isDeleted: false,
      description:  this.eventsForm.controls['descriptionControl'].value,
      endDate:  this.eventsForm.controls['endDateControl'].value,
      eventName:  this.eventsForm.controls['eventNameControl'].value,
      startDate:  this.eventsForm.controls['startDateControl'].value
    };

    let res = await this.eventSerivce.upsertEvent(event);

    if (res < 1){
      this.toastr.error("Error failed to save new event.");
      return;
    }

    this.toastr.success("Success, new event added!");
    await this.getData();
    return;
  }


  //Update Events Method
  public async updateEvent(){
    if (this.eventsForm.invalid){
      this.toastr.error("Please fill out all form fields to submit.");
      return;
    }

    this.selectedEvent.endDate = this.eventsForm.controls['endDateControl'].value;
    this.selectedEvent.startDate = this.eventsForm.controls['startDateControl'].value;
    this.selectedEvent.eventName = this.eventsForm.controls['eventNameControl'].value;
    this.selectedEvent.description = this.eventsForm.controls['descriptionControl'].value;

    let today = new Date();

    if (new Date(this.selectedEvent.endDate) < today){
      this.toastr.error("End date cannot be a past date.");
      return;
    }

    if (new Date(this.selectedEvent.startDate) < today){
      this.toastr.error("Start date must be a future date.");
      return;
    }

    if (new Date(this.selectedEvent.startDate) > new Date(this.selectedEvent.startDate)){
      this.toastr.error("Start date must be before the end date.");
      return;
    }

    await this.eventSerivce.upsertEvent(this.selectedEvent);
    this.toastr.success("Success, the event has been updated.");
    await this.getData();
  }

  public async updateReview(response: boolean){
    if (this.selectedReview == null){
      return;
    }

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

  public resetForms(){
    this.gamesForm.reset();
    this.eventsForm.reset();
    this.reviewsForm.reset();
  }

//Updates Games Form when review is selected
  public async updateGamesForm(){
      this.selectedGame = this.games.find(x => x.id == this.gamesForm.controls['gameNameControl'].value);

      if (this.selectedGame == null){
        return;
      }

      this.selectedGameDetails = this.gameDetailsList.find( x => x.id == this.selectedGame?.gameDetail_ID);

      this.gamesForm.controls['assetControl'].setValue(this.selectedGame.asset_ID);
      this.gamesForm.controls['priceControl'].setValue(this.selectedGame.priceInCAD);
      this.gamesForm.controls['publisherControl'].setValue(this.selectedGameDetails?.publisher);
      this.gamesForm.controls['categoryControl'].setValue(this.selectedGameDetails?.category_ID);
      this.gamesForm.controls['descriptionControl'].setValue(this.selectedGameDetails?.description);

      this.selectedPlatforms = await this.platformService.getPlatformGamesLookUpByGame(this.selectedGame.gameDetail_ID);
      let platList = [];

      for (let i of this.selectedPlatforms){
        platList.push(i.platform_ID);
      }

      this.gamesForm.controls['platformControl'].setValue(platList);
    }

    //Updates Reviews Form when review is selected
  public async updateReviewsForm(val: any){
    this.selectedReview = this.reviewsList.find(x => x.id == val);

    if (this.selectedReview == null || this.selectedReview == undefined){
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

  //Re-Adds button text after calling reviewForms.Reset()
  public resetReviewsFormButtons(){
    this.reviewsForm.controls['rejectControl'].setValue("Reject");
    this.reviewsForm.controls['approveControl'].setValue("Approve");
  }

  
  public async updateEventsForm(val: any){
    this.selectedEvent = this.eventList.find(x => x.id == val)!;
    console.log(this.selectedEvent);
    if (this.selectedEvent == null || this.selectedEvent == undefined){
      return;
    }
    
    this.eventsForm.controls['eventNameControl'].setValue(this.selectedEvent.eventName);
    this.eventsForm.controls['descriptionControl'].setValue(this.selectedEvent.description);
    this.eventsForm.controls['startDateControl'].setValue(this.selectedEvent.startDate.toLocaleString());
    this.eventsForm.controls['endDateControl'].setValue(this.selectedEvent.endDate.toLocaleString());

  }

  public updateOrdersForm(){
    let order = this.orders.find(x => x.id == parseInt(this.ordersForm.controls['orderNameControl'].value));
    console.log(order);
    if (order){
      this.ordersForm.controls['userControl'].setValue(order.user_ID!);
      this.ordersForm.controls['usernameControl'].setValue(this.users.find(x => x.id == order?.user_ID)?.username);
      this.ordersForm.controls['quantityControl'].setValue(order.orderDetails?.quantity);
      this.ordersForm.controls['isConfirmedControl'].setValue(order.isConfirmed);
      this.ordersForm.controls['orderDateControl'].setValue(order.orderDetails?.dateCreated.toLocaleString().substring(0, 10));
      this.ordersForm.controls['cardTypeControl'].setValue(order.paymentDetails?.cardType_ID);
      this.ordersForm.controls['cardNumberControl'].setValue("**** **** **** " + order.paymentDetails?.cardNumber.substring(11,15));
      this.ordersForm.controls['totalCostControl'].setValue(order.paymentDetails?.total.toFixed(2));
      this.ordersForm.controls['addressControl'].setValue(order.shippingAddress?.streetAddress + ", " + order.shippingAddress?.postalCode);
      this.ordersForm.controls['gameControl'].setValue(this.games.find(x => x.id == order?.game_ID)?.gameName);
    }
  }

  public async updateOrder(){
    let order = this.orders.find(x => x.id == parseInt(this.ordersForm.controls['orderNameControl'].value));
    order!.isConfirmed = this.ordersForm.controls['isConfirmedControl'].value;
    await this.orderService.upsertOrder(order!);
    this.toastr.success("Order has been updated.");
    this.ordersForm.reset();
  }
}