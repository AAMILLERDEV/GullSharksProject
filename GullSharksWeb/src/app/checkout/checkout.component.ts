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
import { UserDetails } from 'src/models/UserDetails';
import { ShippingAddress } from 'src/models/ShippingAddress';
import { UserDetailsService } from 'src/services/userDetail.service';
import { ProvinceService } from 'src/services/province.service';
import { CountryService } from 'src/services/country.service';
import { ShippingAddressService } from 'src/services/shippingAddress.service';
import { BillingAddressService } from 'src/services/billingAddress.service';
import { Country } from 'src/models/Country';
import * as bootstrap from 'bootstrap';
import { FormGroup } from '@angular/forms';
import { AddressForm } from 'src/form-models/address-form';
import { Province } from 'src/models/Province';
import { PaymentDetailsForm } from 'src/form-models/paymentDetails-form';


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
  public countries: Country[] = [];

  public userDetails!: UserDetails;
  public shippingAddress!: ShippingAddress;

  public viewReady: boolean = false;
  public offCanvasReady: boolean = false;

  public cartTotal: number = 0;

  public addressModal!: bootstrap.Modal;

  public address!: any;
  public canada_ID: number = 36;
  public addressForm!: FormGroup;
  public paymentDetailsForm: FormGroup;
  public provinces: Province[] = [];
  
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
    public ratingService: RatingService,
    public userDetailsService: UserDetailsService,
    public provinceService: ProvinceService,
    public countryService: CountryService,
    public shippingAddressService: ShippingAddressService,
    public billingAddressService: BillingAddressService) {
      this.addressForm = AddressForm;
      this.paymentDetailsForm = PaymentDetailsForm;
  }

  async ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("User")!);

    if (!this.user){
      this.router.navigateByUrl("login");
    }

    this.addressModal = bootstrap.Modal.getOrCreateInstance('#addressModal', {keyboard: true});

    await this.getGameData();
    await this.getCartData();
    await this.getUserData();
    this.calculateCartTotal();
    this.viewReady = true;
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


  }

  public async getCartData(){
    this.cartItems = await this.cartItemService.getCartItemsByUserID(this.user!.id);
    this.cartItems.map(x => x.game = this.games.find(y => y.id == x.game_ID));
  }

  public async getUserData(){
    this.userDetails = await this.userDetailsService.getUserDetailsByID(this.user!.id);
    this.countries = await this.countryService.getCountries();
    this.provinces = await this.provinceService.getProvinces();
    this.shippingAddress = await this.shippingAddressService.getShippingAddress(this.userDetails!.id);
    if (this.shippingAddress == null){
      this.address = await this.billingAddressService.getBillingAddress(this.userDetails!.id);
    } else {
      this.address = this.shippingAddress;
    }

    this.address.countryName = this.countries.find(x => x.id == this.address.country_ID)?.countryName;
    this.address.provinceTerritoryAB = this.provinces!.find(x => x.id === this.address.province_ID)!.provinceAB;

    this.loadAddressData();
  }

  public updateNav(){
    this.navbar.getData();
  }

  public async removeFromCart(cart: CartItem){
    cart.isDeleted = true;
    this.cartItems = this.cartItems.filter(x => x.game_ID != cart.game_ID);
    await this.cartItemService.upsertCartItem(cart);
  }

  public loadAddressData(){

    this.addressForm.controls['cityControl'].setValue(this.address.city);
    this.addressForm.controls['countryControl'].setValue(this.address.country_ID);
    console.log(this.shippingAddress);
    if (this.shippingAddress){
      this.addressForm.controls['instructionsControl'].setValue(this.shippingAddress.deliveryInstructions);
    }

    this.addressForm.controls['provinceControl'].setValue(this.address.province_ID);
    this.addressForm.controls['postalCodeControl'].setValue(this.address.postalCode);
    this.addressForm.controls['streetAddressControl'].setValue(this.address.streetAddress);
    this.addressForm.controls['shippingAddressControl'].setValue(this.address.matchShipping);

    if (this.userDetails){
      this.addressForm.controls['phoneNumberControl'].setValue(this.userDetails.phoneNumber);
    }
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

  public async resetShippingForm(){
    this.addressForm.reset();
  }

  public openAddressModal(){
    this.addressModal.toggle();
  }

  public async updateShippingAddress(){

    if (this.shippingAddress != null){
      this.shippingAddress.city = this.addressForm.controls['cityControl'].value;
      this.shippingAddress.country_ID = this.addressForm.controls['countryControl'].value;
      this.shippingAddress.deliveryInstructions = this.addressForm.controls['instructionsControl'].value;
      this.shippingAddress.province_ID = this.addressForm.controls['provinceControl'].value;
      this.shippingAddress.postalCode = this.addressForm.controls['postalCodeControl'].value;
      this.shippingAddress.streetAddress = this.addressForm.controls['streetAddressControl'].value;
      await this.shippingAddressService.upsertShippingAddress(this.shippingAddress);
      this.resetShippingForm();
      this.addressModal.toggle();
      await this.getUserData();
      this.toastr.success("Success, address updated");
      return;
    }

    let shippingAddress: ShippingAddress = {
      id: 0,
      isDeleted: false,
      city: this.addressForm.controls['cityControl'].value,
      country_ID: this.addressForm.controls['countryControl'].value,
      deliveryInstructions: this.addressForm.controls['instructionsControl'].value,
      postalCode: this.addressForm.controls['postalCodeControl'].value,
      province_ID: this.addressForm.controls['provinceControl'].value,
      streetAddress: this.addressForm.controls['streetAddressControl'].value,
      userDetails_ID: this.userDetails.id
    };

    let shipRes = await this.shippingAddressService.upsertShippingAddress(shippingAddress);

    if (shipRes < 1){
      this.toastr.error("Unable to add shipping address");
      return;
    }

    this.resetShippingForm();
    this.addressModal.toggle();
    await this.getUserData();
    this.toastr.success("Success, address updated");
  }

  public placeOrder(){

  }

  public calculateCartTotal(){
    let total: number = 0;

    for (let x of this.cartItems){
      total += x.subtotal;
    }

    total = this.calculateCanadianTax(total, this.address.provinceTerritoryAB)!;
    if (total > 0){
      this.cartTotal = total;
    }
  }

}
