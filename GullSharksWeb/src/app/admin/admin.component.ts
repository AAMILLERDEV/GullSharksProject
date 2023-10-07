import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GamesForm } from 'src/form-models/games-form';
import { PreferencesForm } from 'src/form-models/preferences-form';
import { ReviewsForm } from 'src/form-models/reviews-form';
import { User } from 'src/models/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public gamesForm: FormGroup;
  public preferencesForm: FormGroup;
  public reviewsForm: FormGroup;

  public users!: User[];

  public user!: User | undefined;

  public loginCounter: number = 0;

  constructor(public router: Router,
    public userService: UserService,
    public toastr: ToastrService){
    this.gamesForm = GamesForm;
    this.preferencesForm = PreferencesForm;
    this.reviewsForm = ReviewsForm;
  }

  public async ngOnInit() {
    this.users = await this.userService.getAllUsers();
    this.user = JSON.parse(sessionStorage.getItem("User")!);
  }
}