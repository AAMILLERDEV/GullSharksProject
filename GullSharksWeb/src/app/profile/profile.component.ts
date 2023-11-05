import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddressForm } from 'src/form-models/address-form';
import { PasswordForm } from 'src/form-models/passwordForm';
import { PreferencesForm } from 'src/form-models/preferences-form';
import { UserDetailsForm } from 'src/form-models/user-details-form';
import { BillingAddress } from 'src/models/BillingAddress';
import { CategoryPreference } from 'src/models/CategoryPreference';
import { Country } from 'src/models/Country';
import { Credentials } from 'src/models/Credentials';
import { GameCategory } from 'src/models/GameCategory';
import { Language } from 'src/models/Language';
import { LanguagePreference } from 'src/models/LanguagePreference';
import { Platform } from 'src/models/Platform';
import { PlatformPreference } from 'src/models/PlatformPreference';
import { Province } from 'src/models/Province';
import { ShippingAddress } from 'src/models/ShippingAddress';
import { User } from 'src/models/User';
import { UserDetails } from 'src/models/UserDetails';
import { BillingAddressService } from 'src/services/billingAddress.service';
import { CountryService } from 'src/services/country.service';
import { CredentialService } from 'src/services/credential.service';
import { GameCategoryService } from 'src/services/gameCategories.service';
import { LanguageService } from 'src/services/language.service';
import { PlatformService } from 'src/services/platform.service';
import { PreferenceService } from 'src/services/preference.service';
import { ProvinceService } from 'src/services/province.service';
import { ShippingAddressService } from 'src/services/shippingAddress.service';
import { UserService } from 'src/services/user.service';
import { UserDetailsService } from 'src/services/userDetail.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public users!: User[];
  public countries: Country[] = [];
  public provinces: Province[] = [];
  public categoryPreferences!: CategoryPreference[];
  public languagePreferences!: LanguagePreference[];
  public platformPreferences!: PlatformPreference[];
  public user!: User | undefined;
  public userDetails!: UserDetails;
  public billingAddress!: BillingAddress;
  public shippingAddress!: ShippingAddress;

  public showShippingAddress: boolean = false;

  public doUserDetailsExist: boolean = false;
  public doesAddressExist: boolean = false;

  public preferencesForm: FormGroup;
  public addressForm: FormGroup;
  public userDetailsForm: FormGroup;
  public passwordForm: FormGroup;
  
  public userDetailsModal!: bootstrap.Modal;
  public preferencesModal!: bootstrap.Modal;
  public addressModal!: bootstrap.Modal;
  public changePasswordModal!: bootstrap.Modal;

  public email: string = "None Yet";
  public firstname: string = "None Yet";
  public lastname: string = "None Yet";
  public validated: boolean = false;

  public canada_ID: number = 36;

  public platforms: Platform[] = [];
  public categories: GameCategory[] = [];
  public languages: Language[] = [];

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
    public credentialService: CredentialService){

    this.preferencesForm = PreferencesForm;
    this.addressForm = AddressForm;
    this.userDetailsForm = UserDetailsForm;
    this.passwordForm = PasswordForm
  }

  public async ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("User")!);
    if (!this.user){
      this.router.navigateByUrl("login");
      return;
    }

    this.buildModals();

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

  public async buildModals(){
    this.userDetailsModal = bootstrap.Modal.getOrCreateInstance('#userDetailsModal', {keyboard: true});
    this.preferencesModal = bootstrap.Modal.getOrCreateInstance('#preferencesModal', {keyboard: true});
    this.addressModal = bootstrap.Modal.getOrCreateInstance('#addressModal', {keyboard: true});
    this.changePasswordModal = bootstrap.Modal.getOrCreateInstance('#changePasswordModal', {keyboard: true});
    await this.getData();
  }

  public ngOnDestroy() {
    this.resetForms();
  }

  //Loads data from the API for the users profile page
  public async getData(){
    this.userDetails = await this.userDetailsService.getUserDetailsByID(this.user!.id);

    this.countries = await this.countryService.getCountries();
    this.platforms = await this.platformService.getPlatforms();
    this.languages = await this.languageService.getLanguages();
    this.categories = await this.categoryService.GetGameCategories();
    this.provinces = await this.provinceService.getProvinces();
    this.users = await this.userService.getAllUsers();

    if (this.userDetails){
      this.billingAddress = await this.billingAddressService.getBillingAddress(this.userDetails.id);
      console.log(this.billingAddress);
      this.shippingAddress = await this.shippingAddressService.getShippingAddress(this.userDetails.id);
      
      this.firstname = this.userDetails.firstName;
      this.lastname = this.userDetails.lastName;
      this.doUserDetailsExist = true;
    }

    this.categoryPreferences = await this.preferenceService.getCategoryPreferences(this.user!.id);
    this.languagePreferences = await this.preferenceService.getLanguagePreferences(this.user!.id);
    this.platformPreferences = await this.preferenceService.getPlatformPreferences(this.user!.id);

    this.validated = this.user!.isValidated;
    this.email = this.user!.email;

    this.loadPreferenceData();

    if (this.billingAddress){
      this.loadAddressData();
      this.doesAddressExist = true;
    }

    this.loadUserData();
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
      receivesUpdates: this.userDetailsForm.controls['emailUpdatesControl'].value,
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
      await this.getData();
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
      await this.getData();
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
      userDetails_ID: this.userDetails.id
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
          userDetails_ID: this.userDetails.id
        };
    
        let shipRes = await this.shippingAddressService.upsertShippingAddress(shippingAddress);

        if (shipRes < 1){
          this.toastr.error("Unable to add shipping address");
          return;
        }
      }

      this.addressModal.toggle();
      await this.getData();
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
        userDetails_ID: this.userDetails.id
      };
  
      let shipRes = await this.shippingAddressService.upsertShippingAddress(shippingAddress);

      if (shipRes < 1){
        this.toastr.error("Unable to add shipping address");
        return;
      }
    }

    this.toastr.success("Success, your address has been updated!");
    this.addressModal.toggle();
    await this.getData();
    return;
  }

  public loadUserData(){

    if (!this.userDetails){
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
    await this.getData();
  }

  public async deleteAddress(){
    this.billingAddress.isDeleted = true;
    await this.billingAddressService.upsertBillingAddress(this.billingAddress);
    await this.getData();
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
    await this.getData();
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
      await this.getData();
      this.passwordForm.reset();
      return;
    }

    this.toastr.error("Error, could not update password");
    return;
  }
}
