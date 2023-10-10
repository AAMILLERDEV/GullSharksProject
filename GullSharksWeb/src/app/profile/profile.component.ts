import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddressForm } from 'src/form-models/address-form';
import { PreferencesForm } from 'src/form-models/preferences-form';
import { UserDetailsForm } from 'src/form-models/user-details-form';
import { CategoryPreference } from 'src/models/CategoryPreference';
import { Country } from 'src/models/Country';
import { GameCategory } from 'src/models/GameCategory';
import { Language } from 'src/models/Language';
import { LanguagePreference } from 'src/models/LanguagePreference';
import { Platform } from 'src/models/Platform';
import { PlatformPreference } from 'src/models/PlatformPreference';
import { Province } from 'src/models/Province';
import { User } from 'src/models/User';
import { UserDetails } from 'src/models/UserDetails';
import { PreferenceService } from 'src/services/preference.service';
import { UserService } from 'src/services/user.service';
import { UserDetailsService } from 'src/services/userDetail.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public users!: User[];
  public countries: Country[] = [];
  public provinces: Province[] = [];

  public categoryPreferences: CategoryPreference[] = [];
  public languagePreferences: LanguagePreference[] = [];
  public platformPreferences: PlatformPreference[] = [];

  public user!: User | undefined;
  public userDetails!: UserDetails;

  public preferencesForm: FormGroup;
  public addressForm: FormGroup;
  public userDetailsForm: FormGroup;
  
  public userDetailsModal!: bootstrap.Modal;
  public preferencesModal!: bootstrap.Modal;
  public addressModal!: bootstrap.Modal;

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
    public preferenceService: PreferenceService){
    this.preferencesForm = PreferencesForm;
    this.addressForm = AddressForm;
    this.userDetailsForm = UserDetailsForm;
    
  }

  public async ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("User")!);


    if (!this.user){
      this.router.navigateByUrl("login");
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

  public async buildModals(){
    this.userDetailsModal = bootstrap.Modal.getOrCreateInstance('#userDetailsModal', {keyboard: true});
    this.preferencesModal = bootstrap.Modal.getOrCreateInstance('#preferencesModal', {keyboard: true});
    this.addressModal = bootstrap.Modal.getOrCreateInstance('#addressModal', {keyboard: true});
    await this.getData();
  }

  public async getData(){
    this.userDetails = await this.userDetailsService.getUserDetailsByID(this.user!.id);
    this.users = await this.userService.getAllUsers();

    this.validated = this.user!.isValidated;
    this.email = this.user!.email;

    if (this.userDetails != null){
      this.firstname = this.userDetails.first_name;
      this.lastname = this.userDetails.last_name;
    }

    this.categoryPreferences = await this.preferenceService.getCategoryPreferences(this.user!.id);
    this.languagePreferences = await this.preferenceService.getLanguagePreferences(this.user!.id);
    this.platformPreferences = await this.preferenceService.getPlatformPreferences(this.user!.id);

    let platList = [];
    let langList = [];
    let catList = [];

    for (let i of this.categoryPreferences){
      platList.push(i.category_ID);
    }

    for (let i of this.languagePreferences){
      langList.push(i.language_ID);
    }

    for (let i of this.platformPreferences){
      catList.push(i.platform_ID);
    }

    this.preferencesForm.controls['platformControl'].setValue(platList);
    this.preferencesForm.controls['languageControl'].setValue(langList);
    this.preferencesForm.controls['categoryControl'].setValue(catList);
  }

  // public postalCodeValidation(postalCode: string){
  //   if (/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] *\d[A-Z]\d)$/.test(postalCode)) {
  //     this.preferencesForm.controls['postalCodeControl'].set
  //   }

  //   return false;
  // }
}
