import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PreferencesForm } from 'src/form-models/preferences-form';
import { User } from 'src/models/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public users!: User[];

  public user!: User | undefined;

  public preferencesForm: FormGroup;

  constructor(public router: Router,
    public userService: UserService,
    public toastr: ToastrService){
    this.preferencesForm = PreferencesForm;
  }

  public async ngOnInit() {
    this.users = await this.userService.getAllUsers();
  }
}
