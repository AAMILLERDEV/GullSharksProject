import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddressForm } from 'src/form-models/address-form';
import { PreferencesForm } from 'src/form-models/preferences-form';
import { UserDetailsForm } from 'src/form-models/user-details-form';
import { Country } from 'src/models/Country';
import { GameCategory } from 'src/models/GameCategory';
import { Language } from 'src/models/Language';
import { Platform } from 'src/models/Platform';
import { Province } from 'src/models/Province';
import { User } from 'src/models/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public users!: User[];
  public countries: Country[] = [];
  public provinces: Province[] = [];

  public user!: User | undefined;

  public preferencesForm: FormGroup;
  public addressForm: FormGroup;
  public userDetailsForm: FormGroup;
  
  public userDetailsModal!: bootstrap.Modal;
  public preferencesModal!: bootstrap.Modal;
  public addressModal!: bootstrap.Modal;
  

  public canada_ID: number = 1;

  public platforms: Platform[] = [];
  public categories: GameCategory[] = [];
  public languages: Language[] = [];

  constructor(public router: Router,
    public userService: UserService,
    public toastr: ToastrService){
    this.preferencesForm = PreferencesForm;
    this.addressForm = AddressForm;
    this.userDetailsForm = UserDetailsForm;
    
  }

  public async ngOnInit() {
    this.users = await this.userService.getAllUsers();
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

  public buildModals(){
    this.userDetailsModal = bootstrap.Modal.getOrCreateInstance('#userDetailsModal', {keyboard: true});
    this.preferencesModal = bootstrap.Modal.getOrCreateInstance('#preferencesModal', {keyboard: true});
    this.addressModal = bootstrap.Modal.getOrCreateInstance('#addressModal', {keyboard: true});
  }

  // public postalCodeValidation(postalCode: string){
  //   if (/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] *\d[A-Z]\d)$/.test(postalCode)) {
  //     this.preferencesForm.controls['postalCodeControl'].set
  //   }

  //   return false;
  // }
}
