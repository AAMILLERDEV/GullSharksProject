import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import * as bootstrap from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddressForm } from 'src/form-models/address-form';
import { OrdersForm } from 'src/form-models/orders-form';
import { PasswordForm } from 'src/form-models/passwordForm';
import { PreferencesForm } from 'src/form-models/preferences-form';
import { ReviewsForm } from 'src/form-models/reviews-form';
import { SearchForm } from 'src/form-models/search-form';
import { UserDetailsForm } from 'src/form-models/user-details-form';
import { Asset } from 'src/models/Asset';
import { BillingAddress } from 'src/models/BillingAddress';
import { CategoryPreference } from 'src/models/CategoryPreference';
import { Country } from 'src/models/Country';
import { Credentials } from 'src/models/Credentials';
import { FriendsList } from 'src/models/FriendsList';
import { Game } from 'src/models/Game';
import { GameCategory } from 'src/models/GameCategory';
import { GameDetails } from 'src/models/GameDetails';
import { GameReview } from 'src/models/GameReview';
import { Language } from 'src/models/Language';
import { LanguagePreference } from 'src/models/LanguagePreference';
import { Order } from 'src/models/Order';
import { OrderDetail } from 'src/models/OrderDetail';
import { PaymentDetail } from 'src/models/PaymentDetail';
import { Platform } from 'src/models/Platform';
import { PlatformPreference } from 'src/models/PlatformPreference';
import { Province } from 'src/models/Province';
import { Ratings } from 'src/models/Ratings';
import { ShippingAddress } from 'src/models/ShippingAddress';
import { User } from 'src/models/User';
import { UserDetails } from 'src/models/UserDetails';
import { UserGame } from 'src/models/UserGames';
import { Wishlist } from 'src/models/Wishlist';
import { AssetService } from 'src/services/asset.service';
import { BillingAddressService } from 'src/services/billingAddress.service';
import { CartItemService } from 'src/services/cartItem.service';
import { CountryService } from 'src/services/country.service';
import { CredentialService } from 'src/services/credential.service';
import { FriendsListService } from 'src/services/friendslist.service';
import { GameService } from 'src/services/game.service';
import { GameCategoryService } from 'src/services/gameCategories.service';
import { GameDetailService } from 'src/services/gameDetails.service';
import { GameReviewService } from 'src/services/gameReview.service';
import { LanguageService } from 'src/services/language.service';
import { OrderService } from 'src/services/order.service';
import { OrderDetailService } from 'src/services/orderDetails.service';
import { PaymentDetailsService } from 'src/services/paymentDetail.service';
import { PlatformService } from 'src/services/platform.service';
import { PreferenceService } from 'src/services/preference.service';
import { ProvinceService } from 'src/services/province.service';
import { RatingService } from 'src/services/rating.service';
import { ShippingAddressService } from 'src/services/shippingAddress.service';
import { UserService } from 'src/services/user.service';
import { UserDetailsService } from 'src/services/userDetail.service';
import { UserGameService } from 'src/services/userGame.service';
import { WishlistService } from 'src/services/wishlist.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public users!: User[];
  public allUserDetails: UserDetails[] = [];
  public userListForSearch: User[] = [];
  public usersForSearch: User[] = [];
  public countries: Country[] = [];
  public provinces: Province[] = [];
  public orders: Order[] = [];
  public orderDetails: OrderDetail[] = [];
  public paymentDetails: PaymentDetail[] = [];
  public categoryPreferences!: CategoryPreference[];
  public languagePreferences!: LanguagePreference[];
  public platformPreferences!: PlatformPreference[];
  public reviewsList: GameReview[] = [];
  public user!: User | undefined;
  public userDetails!: UserDetails;
  public billingAddress!: BillingAddress;
  public shippingAddress!: ShippingAddress;

  public wishlistUser: string = "Your";

  public showShippingAddress: boolean = false;

  public doUserDetailsExist: boolean = false;
  public doesAddressExist: boolean = false;

  public preferencesForm: FormGroup;
  public addressForm: FormGroup;
  public userDetailsForm: FormGroup;
  public passwordForm: FormGroup;
  public searchForm: FormGroup;
  public ordersForm: FormGroup;
  public reviewsForm: FormGroup;

  public reviewStatus: string = "Unapproved";
  
  public userDetailsModal!: bootstrap.Modal;
  public preferencesModal!: bootstrap.Modal;
  public addressModal!: bootstrap.Modal;
  public changePasswordModal!: bootstrap.Modal;
  public addFriendsModal!: bootstrap.Modal;
  public ordersModal!: bootstrap.Modal;
  public wishlistModal!: bootstrap.Modal;
  public reviewsModal!: bootstrap.Modal;

  public email: string = "None Yet";
  public firstname: string = "None Yet";
  public lastname: string = "None Yet";
  public validated: boolean = false;
  public viewReady: boolean = false;

  public userGames?: UserGame[];
  public games: Game[] = [];
  public gameDetails: GameDetails[] = [];
  public assets: Asset[] = [];
  public wishlist: Wishlist[] = [];
  public ratings: Ratings[] = [];

  public canada_ID: number = 36;

  public platforms: Platform[] = [];
  public categories: GameCategory[] = [];
  public languages: Language[] = [];

  public userFriendsList: FriendsList[] = [];
  public friendsList: FriendsList[] = [];

  public friendsWishList: Wishlist[] = [];
  public currentWishlist: Wishlist[] = [];

  constructor(public router: Router,
    public userService: UserService,
    public toastr: ToastrService,
    public userDetailsService: UserDetailsService,
    public preferenceService: PreferenceService,
    public provinceService: ProvinceService,
    public countryService: CountryService,
    public platformService: PlatformService,
    public languageService: LanguageService,
    public categoryService: GameCategoryService,
    public billingAddressService: BillingAddressService,
    public shippingAddressService: ShippingAddressService,
    public credentialService: CredentialService,
    public gameService: GameService,
    public gameDetailService: GameDetailService,
    public assetService: AssetService,
    public cartItemService: CartItemService,
    public wishlistService: WishlistService,
    public ratingService: RatingService,
    public userGameService: UserGameService,
    public friendsListService: FriendsListService,
    private orderService: OrderService,
    private paymentDetailService: PaymentDetailsService,
    private orderDetailService: OrderDetailService,
    private reviewService: GameReviewService
    ){

    this.preferencesForm = PreferencesForm;
    this.addressForm = AddressForm;
    this.userDetailsForm = UserDetailsForm;
    this.passwordForm = PasswordForm;
    this.searchForm = SearchForm;
    this.ordersForm = OrdersForm;
    this.reviewsForm = ReviewsForm;
  }

  public async ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("User")!);
    if (!this.user){
      this.router.navigateByUrl("login");
      return;
    }

    await this.getUserData();
    await this.getGameData();
    this.buildModals();
    this.viewReady = true;
    this.ordersForm.controls['isConfirmedControl'].disable();

  }

  public openUserDetailsModal(){
    this.userDetailsModal.toggle();
  }

  public openPreferencesModal(){
    this.preferencesModal.toggle();
  }

  public openAddressModal(){
    this.addressModal.toggle();
  }

  public openPasswordModal(){
    this.changePasswordModal.toggle();
  }

  public openAddFriendModal(){
    if (this.doUserDetailsExist == false){
      this.toastr.error("Please update your profile with your first and last name before adding friends.");
      return;
    }
    this.addFriendsModal.toggle();
  }

  public openOrdersModal(){
    this.ordersModal.toggle();
  }

  public openReviewsModal(){
    this.reviewsModal.toggle();
  }

  public openWishlistModal(user_ID: number){
    this.currentWishlist = this.friendsWishList.filter(x => x.user_ID == user_ID);
    this.wishlistUser = this.users.find(x => x.id == user_ID)?.username + "'s";
    this.wishlistModal.toggle();
  }

  filterItems(val: string) {
    this.usersForSearch = this.userListForSearch.filter(
      (item) =>
        item.username.toLowerCase().indexOf(val.toLowerCase()) !== -1
    );
  }

  public buildModals(){
    this.userDetailsModal = bootstrap.Modal.getOrCreateInstance('#userDetailsModal', {keyboard: true});
    this.preferencesModal = bootstrap.Modal.getOrCreateInstance('#preferencesModal', {keyboard: true});
    this.addressModal = bootstrap.Modal.getOrCreateInstance('#addressModal', {keyboard: true});
    this.changePasswordModal = bootstrap.Modal.getOrCreateInstance('#changePasswordModal', {keyboard: true});
    this.addFriendsModal = bootstrap.Modal.getOrCreateInstance('#addFriendsModal', {keyboard: true});
    this.ordersModal = bootstrap.Modal.getOrCreateInstance('#ordersModal', {keyboard: true});
    this.wishlistModal = bootstrap.Modal.getOrCreateInstance('#wishlistModal', {keyboard: true});
    this.reviewsModal = bootstrap.Modal.getOrCreateInstance('#reviewsModal', {keyboard: true});
  }

  public ngOnDestroy() {
    this.resetForms();
  }

  //Loads data from the API for the users profile page
  public async getUserData(){
    this.userDetails = await this.userDetailsService.getUserDetailsByID(this.user!.id);
    this.allUserDetails = await this.userDetailsService.getAllUserDetails();
    this.countries = await this.countryService.getCountries();
    this.platforms = await this.platformService.getPlatforms();
    this.languages = await this.languageService.getLanguages();
    this.categories = await this.categoryService.GetGameCategories();
    this.provinces = await this.provinceService.getProvinces();
    this.users = await this.userService.getAllUsers();
    this.reviewsList = await this.reviewService.getGameReviews();
    this.reviewsList = this.reviewsList.filter(x => x.user_ID == this.user!.id);


    let userDetails: UserDetails[] = await this.userDetailsService.getAllUserDetails();
    this.userFriendsList = await this.friendsListService.getFriendsListByUserID(this.user!.id);
    let friendsListIDList: number[] = [];

    if (this.userFriendsList != null && this.userFriendsList.length > 0){
      this.userFriendsList = this.userFriendsList.map(x => {
        if (x.user_ID == this.user!.id){
          x.user = this.users.find(y => y.id == x.friend_ID);
        } else {
          x.user = this.users.find(y => y.id == x.user_ID);
        }

        x.userDetails = userDetails.find(y => y.id == x.user!.id);
        return x;
      });

      friendsListIDList = this.userFriendsList.map(x => x.friend_ID);
    }

    this.userListForSearch = this.users.filter(x => !friendsListIDList.find(y => y == x.id) && this.user?.id != x.id);

    if (this.userDetails){
      this.billingAddress = await this.billingAddressService.getBillingAddress(this.userDetails!.id);
      this.firstname = this.userDetails.firstName;
      this.lastname = this.userDetails.lastName;
      this.doUserDetailsExist = true;
    }

    this.shippingAddress = await this.shippingAddressService.getShippingAddress(this.user!.id);

    this.categoryPreferences = await this.preferenceService.getCategoryPreferences(this.user!.id);
    this.languagePreferences = await this.preferenceService.getLanguagePreferences(this.user!.id);
    this.platformPreferences = await this.preferenceService.getPlatformPreferences(this.user!.id);

    this.validated = this.user!.isValidated;
    this.email = this.user!.email;

    this.loadPreferenceData();
    console.log(this.billingAddress)
    if (this.billingAddress){
      await this.loadAddressData();
      this.doesAddressExist = true;

    }

    this.loadUserData();
  }

  public async getGameData(){
    this.games = await this.gameService.getGames();
    this.gameDetails = await this.gameDetailService.getGameDetails();
    this.assets = await this.assetService.getAssets();
    this.ratings = await this.ratingService.getRatings();
    this.userGames = await this.userGameService.getUserGames(this.user!.id);
    this.friendsWishList = await this.wishlistService.getWishlist();
    this.games.map(x => x.gameDetails = this.gameDetails.find(y => y.id == x.gameDetail_ID));
    this.games.map(x => x.gameAsset = this.assets.find(z => z.id == x.asset_ID));
    this.games.map(x => x.srcFront = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.src = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/front.jpg");
    this.games.map(x => x.srcBack = "assets/game_assets/" + this.assets.find(z => z.id == x.asset_ID)?.assetURL + "/back.jpg");
    let categories: GameCategory[] = await this.categoryService.GetGameCategories();
    this.gameDetails?.map(x => x.categoryName = categories.find(y => y.id == x.category_ID)?.categoryName);
    this.userGames = this.userGames!.map(x => {
      x.game = this.games.find(y => y.id == x.game_ID);
      return x;
    });

    if (this.friendsWishList){
      this.friendsWishList = this.friendsWishList.map(x => {
        x.game = this.games.find(y => y.id == x.game_ID)!;
        return x;
      });
    }

    this.paymentDetails = await this.paymentDetailService.getPaymentDetails(this.user!.id);
    this.orders = await this.orderService.getOrdersByUserID(this.user!.id);
    if (this.orders != null && this.orders.length > 0){
      for (let x of this.orders){
        x.orderDetails = await this.orderDetailService.getOrderDetailsByID(x.id);
        x.shippingAddress = this.shippingAddress;
        x.paymentDetails = this.paymentDetails.find(y => y.order_ID == x.id);
        x.orderName = this.games.find(y => y.id == x.game_ID)?.gameName + " - " + x.orderDetails?.dateCreated.toLocaleString().substring(0, 10);
      }
    }

    if (this.reviewsList != null && this.reviewsList.length > 0){
      for (let i of this.reviewsList){
        i.review_name = `Game: ${this.games.find(x => x.id == i.game_ID)!.gameName} - Date Added: ${i.dateAdded.toLocaleString().substring(0, 10)}`;
      }
    }

    this.applyGameRatings();
  }

  public applyGameRatings(){
    for (let x of this.games){
      let ratings = this.ratings.filter(y => y.game_ID == x.id);
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

  public async deleteWishlistItem(wishlist: Wishlist, user_ID: number){
    wishlist.isDeleted = true;
    await this.wishlistService.upsertWishlist(wishlist);
    await this.getGameData();
    this.currentWishlist = this.friendsWishList.filter(x => x.user_ID == user_ID);
  }

  //Loads user preference data from the api
  public loadPreferenceData(){
    let platList = [];
    let langList = [];
    let catList = [];

    if (this.categoryPreferences){
      for (let i of this.categoryPreferences){
        catList.push(i.category_ID);
      }
    }

    if (this.platformPreferences){
      for (let i of this.platformPreferences){
        platList.push(i.platform_ID);
      }
    }

    if (this.languagePreferences){
      for (let i of this.languagePreferences){
        langList.push(i.language_ID);
      }
    }

    this.preferencesForm.controls['platformControl'].setValue(platList);
    this.preferencesForm.controls['languageControl'].setValue(langList);
    this.preferencesForm.controls['categoryControl'].setValue(catList);
  }

  //Insert user details method
  public async insertUserDetails(){

    if (this.userDetailsForm.invalid){
      this.toastr.error("Please fill out all form fields to submit.");
      return;
    }

    let userDetails: UserDetails = {
      birthDate: this.userDetailsForm.controls['birthDateControl'].value,
      firstName: this.userDetailsForm.controls['firstNameControl'].value,
      lastName: this.userDetailsForm.controls['lastNameControl'].value,
      receivesUpdates: this.userDetailsForm.controls['emailUpdatesControl'].value == null ? false : true,
      gender: this.userDetailsForm.controls['genderControl'].value,
      isDeleted: false,
      id: 0,
      user_ID: this.user!.id,
      phoneNumber: null
    }

    let res = await this.userDetailsService.upsertUserDetails(userDetails);

    if (res > 0){
      this.toastr.success("Success, your details have been updated!");
      this.userDetailsModal.toggle();
      await this.getUserData();
      return;
    }

    this.toastr.error("Error, failed to save.");
    return;
  }

  //Update User Details method
  public async updateUserDetails(){

    if (this.userDetailsForm.invalid){
      this.toastr.error("Please fill out all form fields to submit.");
      return;
    }

    this.userDetails.firstName = this.userDetailsForm.controls['firstNameControl'].value;
    this.userDetails.lastName = this.userDetailsForm.controls['lastNameControl'].value;
    this.userDetails.gender = this.userDetailsForm.controls['genderControl'].value;
    this.userDetails.birthDate = this.userDetailsForm.controls['birthDateControl'].value;
    this.userDetails.receivesUpdates = this.userDetailsForm.controls['emailUpdatesControl'].value;

    let today = new Date();

    if (new Date(this.userDetails.birthDate) > today){
      this.toastr.error("Birth day cannot be a current or future date.");
      return;
    }
     

    let res = await this.userDetailsService.upsertUserDetails(this.userDetails);

    if (res == this.userDetails.id){
      this.toastr.success("Success, your details have been updated!");
      this.userDetailsModal.toggle();
      await this.getUserData();
      return;
    }

    this.toastr.error("Error, failed to save.");
    return;
  }

  public async insertShippingAddress(){

    if (this.addressForm.invalid){
      this.toastr.error("Please fill out all form fields to submit.");
      return;
    }

    let billingAddress: BillingAddress = {
      id: 0,
      isDeleted: false,
      city: this.addressForm.controls['cityControl'].value,
      country_ID: this.addressForm.controls['countryControl'].value,
      deliveryInstructions: this.addressForm.controls['instructionsControl'].value,
      postalCode: this.addressForm.controls['postalCodeControl'].value,
      province_ID: this.addressForm.controls['provinceControl'].value,
      streetAddress: this.addressForm.controls['streetAddressControl'].value,
      matchShipping: this.addressForm.controls['shippingAddressControl'].value,
      user_ID: this.userDetails.id
    };

    let res = await this.billingAddressService.upsertBillingAddress(billingAddress);

    if (this.userDetails){
      this.userDetails.phoneNumber = this.addressForm.controls['phoneNumberControl'].value;
      await this.userDetailsService.upsertUserDetails(this.userDetails);
    }


    if (res > 0){
      this.toastr.success("Success, your address has been updated!");

      if (this.addressForm.controls['shippingAddressControl'].value == true && !this.shippingAddress){
        let shippingAddress: ShippingAddress = {
          id: 0,
          isDeleted: false,
          city: this.addressForm.controls['cityControl'].value,
          country_ID: this.addressForm.controls['countryControl'].value,
          deliveryInstructions: this.addressForm.controls['instructionsControl'].value,
          postalCode: this.addressForm.controls['postalCodeControl'].value,
          province_ID: this.addressForm.controls['provinceControl'].value,
          streetAddress: this.addressForm.controls['streetAddressControl'].value,
          user_ID: this.userDetails.id
        };
    
        let shipRes = await this.shippingAddressService.upsertShippingAddress(shippingAddress);

        if (shipRes < 1){
          this.toastr.error("Unable to add shipping address");
          return;
        }
      }

      this.addressModal.toggle();
      await this.getUserData();
      return;
    }

    this.toastr.error("Error, failed to save.");
    return;
  }

  public async updateShippingAddress(){
    if (this.addressForm.invalid){
      this.toastr.error("Please fill out all form fields to submit.");
      return;
    }

    this.billingAddress.city = this.addressForm.controls['cityControl'].value;
    this.billingAddress.country_ID = this.addressForm.controls['countryControl'].value;
    this.billingAddress.deliveryInstructions = this.addressForm.controls['instructionsControl'].value;
    this.billingAddress.province_ID = this.addressForm.controls['provinceControl'].value;
    this.billingAddress.postalCode = this.addressForm.controls['postalCodeControl'].value;
    this.billingAddress.streetAddress = this.addressForm.controls['streetAddressControl'].value;
    this.userDetails.phoneNumber = this.addressForm.controls['phoneNumberControl'].value;
    this.billingAddress.matchShipping = this.addressForm.controls['shippingAddressControl'].value;

    await this.billingAddressService.upsertBillingAddress(this.billingAddress);
    await this.userDetailsService.upsertUserDetails(this.userDetails);

    if (this.addressForm.controls['shippingAddressControl'].value == true && this.shippingAddress){
      this.shippingAddress.city = this.addressForm.controls['cityControl'].value;
      this.shippingAddress.country_ID = this.addressForm.controls['countryControl'].value;
      this.shippingAddress.deliveryInstructions = this.addressForm.controls['instructionsControl'].value;
      this.shippingAddress.province_ID = this.addressForm.controls['provinceControl'].value;
      this.shippingAddress.postalCode = this.addressForm.controls['postalCodeControl'].value;
      this.shippingAddress.streetAddress = this.addressForm.controls['streetAddressControl'].value;
      await this.shippingAddressService.upsertShippingAddress(this.shippingAddress);
    } else {
      let shippingAddress: ShippingAddress = {
        id: 0,
        isDeleted: false,
        city: this.addressForm.controls['cityControl'].value,
        country_ID: this.addressForm.controls['countryControl'].value,
        deliveryInstructions: this.addressForm.controls['instructionsControl'].value,
        postalCode: this.addressForm.controls['postalCodeControl'].value,
        province_ID: this.addressForm.controls['provinceControl'].value,
        streetAddress: this.addressForm.controls['streetAddressControl'].value,
        user_ID: this.user!.id
      };
  
      let shipRes = await this.shippingAddressService.upsertShippingAddress(shippingAddress);

      if (shipRes < 1){
        this.toastr.error("Unable to add shipping address");
        return;
      }
    }

    this.toastr.success("Success, your address has been updated!");
    this.addressModal.toggle();
    await this.getUserData();
    return;
  }

  public loadUserData(){

    if (!this.userDetails){
      this.userDetailsForm.reset();
      return;
    }

    this.userDetailsForm.controls['firstNameControl'].setValue(this.userDetails.firstName);
    this.userDetailsForm.controls['lastNameControl'].setValue(this.userDetails.lastName);
    this.userDetailsForm.controls['genderControl'].setValue(this.userDetails.gender);
    this.userDetailsForm.controls['birthDateControl'].setValue(this.userDetails.birthDate.toLocaleString().substring(0, 10));
    this.userDetailsForm.controls['emailUpdatesControl'].setValue(this.userDetails.receivesUpdates);
  }

  public loadAddressData(){

    this.addressForm.controls['cityControl'].setValue(this.billingAddress.city);
    this.addressForm.controls['countryControl'].setValue(this.billingAddress.country_ID);

    if (this.shippingAddress){
      this.addressForm.controls['instructionsControl'].setValue(this.shippingAddress.deliveryInstructions);
    }

    this.addressForm.controls['provinceControl'].setValue(this.billingAddress.province_ID);
    this.addressForm.controls['postalCodeControl'].setValue(this.billingAddress.postalCode);
    this.addressForm.controls['streetAddressControl'].setValue(this.billingAddress.streetAddress);
    this.addressForm.controls['shippingAddressControl'].setValue(this.billingAddress.matchShipping);

    if (this.userDetails){
      this.addressForm.controls['phoneNumberControl'].setValue(this.userDetails.phoneNumber);
    }
  }

  public async resetForms(){
    this.preferencesForm.reset();
    this.userDetailsForm.reset();
    this.addressForm.reset();
    this.passwordForm.reset();
    await this.getUserData();
  }

  public async deleteAddress(){
    this.billingAddress.isDeleted = true;
    await this.billingAddressService.upsertBillingAddress(this.billingAddress);
    await this.getUserData();
    this.addressForm.reset();
    this.addressModal.toggle();
    this.toastr.success("Success, address has been deleted.");
  }

  public async updatePreferences(){

    let platformPreferences = this.preferencesForm.controls['platformControl'].value;
    let categoryPreferences = this.preferencesForm.controls['categoryControl'].value;
    let languagePreferences = this.preferencesForm.controls['languageControl'].value;

    for (let i of platformPreferences){
      if (this.platformPreferences && this.platformPreferences.find(x => x.platform_ID == i) == null){

        let newPlatformPreference: PlatformPreference = {
          id: 0,
          isDeleted: false,
          platform_ID: i,
          user_ID: this.user!.id
        }
        await this.preferenceService.upsertPlatformPreference(newPlatformPreference);

      } else if (this.platformPreferences) {
        for (let i of this.platformPreferences){
          if (platformPreferences.find((x: number) => x == i.platform_ID) == null){
            i.isDeleted = true;
            await this.preferenceService.upsertPlatformPreference(i);
          }
        }
      } else {
        let newPlatformPreference: PlatformPreference = {
          id: 0,
          isDeleted: false,
          platform_ID: i,
          user_ID: this.user!.id
        }
        await this.preferenceService.upsertPlatformPreference(newPlatformPreference);
      }
    }

    for (let i of categoryPreferences){
      if (this.categoryPreferences && this.categoryPreferences.find(x => x.category_ID == i) == null){

        let newCategoryPreference: CategoryPreference = {
          id: 0,
          isDeleted: false,
          category_ID: i,
          user_ID: this.user!.id
        }
        await this.preferenceService.upsertCategoryPreference(newCategoryPreference);

      } else if (this.categoryPreferences)  {
        for (let i of this.categoryPreferences){
          if (categoryPreferences.find((x: number) => x == i.category_ID) == null){
            i.isDeleted = true;
            await this.preferenceService.upsertCategoryPreference(i);
          }
        }
      } else {
        let newCategoryPreference: CategoryPreference = {
          id: 0,
          isDeleted: false,
          category_ID: i,
          user_ID: this.user!.id
        }
        await this.preferenceService.upsertCategoryPreference(newCategoryPreference);
      }
    }

    for (let i of languagePreferences){
      if (this.languagePreferences && this.languagePreferences.find(x => x.language_ID == i) == null){

        let newLangPreference: LanguagePreference = {
          id: 0,
          isDeleted: false,
          language_ID: i,
          user_ID: this.user!.id
        }
        await this.preferenceService.upsertLanguagePreference(newLangPreference);

      } else if (this.languagePreferences) {
        for (let i of this.languagePreferences){
          if (languagePreferences.find((x: number) => x == i.language_ID) == null){
            i.isDeleted = true;
            await this.preferenceService.upsertLanguagePreference(i);
          }
        }
      } else {
        let newLangPreference: LanguagePreference = {
          id: 0,
          isDeleted: false,
          language_ID: i,
          user_ID: this.user!.id
        }
        await this.preferenceService.upsertLanguagePreference(newLangPreference);
      }
    }

    this.toastr.success("Success, your preferences have been updated!");
    this.preferencesModal.toggle();
    await this.getUserData();
    return;
  }

  public async updateCredentials(){
    if (this.passwordForm.invalid){
      this.toastr.error("Please fill out all form fields correctly. Passwords must be at least 8 characters, both upper and lower case, a number and special character.");
      return;
    }

    if (this.passwordForm.controls['newPasswordControl'].value != this.passwordForm.controls['verifyPasswordControl'].value){
      this.toastr.error("Please ensure your new passwords match each other.");
      return;
    }

    let passwordCheck = await this.credentialService.checkCredentials(this.user!, btoa(this.passwordForm.controls['currentPasswordControl'].value));

    if (!passwordCheck) {
      this.toastr.error("Please ensure your current password is correct.");
      return;
    }

    let credential: Credentials = {
      id: this.user!.credentials_ID,
      credentialValue: btoa(this.passwordForm.controls['newPasswordControl'].value),
      isDeleted: false,
      user_ID: this.user!.id
    }

    let res = await this.credentialService.upsertCredentials(credential);

    if (res == this.user!.credentials_ID){
      this.toastr.success("Success, your password has been updated!");
      this.changePasswordModal.toggle();
      await this.getUserData();
      this.passwordForm.reset();
      return;
    }

    this.toastr.error("Error, could not update password");
    return;
  }

  public async sendFriendRequest(){
    if (this.searchForm.controls['usernameControl'].value == null){
      this.toastr.error("Please select a CVGS member.");
      return;
    }

    let friend = this.users.find(x => x.id == this.searchForm.controls['usernameControl'].value);

    if (friend == null){
      this.toastr.error("Error, could not find CVGS member.");
      return;
    }

    let friendsList: FriendsList = {
      dateAdded: new Date(),
      friend_ID: friend!.id,
      id: 0,
      isConfirmed: false,
      isDeleted: false,
      user_ID: this.user!.id    
    };

    let res = await this.friendsListService.upsertFriendsList(friendsList);

    if (res > 0){
      this.toastr.success("Success, friend request has been sent.");
      this.searchForm.reset();
      this.addFriendsModal.toggle();
    }

    await this.getUserData();
  }

  public async confirmFriendRequest(friendsList: FriendsList, val: boolean){
    
    if (val){
      friendsList.isConfirmed = true;
      friendsList.dateAdded = new Date();
    } else {
      friendsList.isDeleted = true;
    }

    await this.friendsListService.upsertFriendsList(friendsList);
    await this.getUserData();
    return this.toastr.success("Friends list has been updated!");

  }

  public updateOrdersForm(){
    let order = this.orders.find(x => x.id == parseInt(this.ordersForm.controls['orderNameControl'].value));
    console.log(order);
    if (order){
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

  public async updateReviewsForm(val: any){
    let review = this.reviewsList.find(x => x.id == val);

    if (review == null || review == undefined){
      return;
    }

    if (review.isApproved){
      this.reviewStatus = "Approved";
    } else {
      this.reviewStatus = "Unapproved";
    }

    let rating = this.ratings.find(x => x.id == review?.rating_ID)?.ratingNumber;
    
    this.reviewsForm.controls['gameControl'].setValue(this.games!.find(x => x.id == review!.game_ID)!.gameName);
    this.reviewsForm.controls['descriptionControl'].setValue(review?.description);
    this.reviewsForm.controls['ratingControl'].setValue(rating);

  }
}
