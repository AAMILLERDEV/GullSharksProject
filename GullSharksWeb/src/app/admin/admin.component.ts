import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EventsForm } from 'src/form-models/events-form';
import { GamesForm } from 'src/form-models/games-form';
import { PreferencesForm } from 'src/form-models/preferences-form';
import { ReviewsForm } from 'src/form-models/reviews-form';
import { Game } from 'src/models/Game';
import { Platform } from 'src/models/Platform';
import { User } from 'src/models/User';
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
  public platforms: Platform[] = [];

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
    public toastr: ToastrService){
    this.gamesForm = GamesForm;
    this.reviewsForm = ReviewsForm;
    this.eventsForm = EventsForm;

  }

  public async ngOnInit() {
    this.users = await this.userService.getAllUsers();
    this.user = JSON.parse(sessionStorage.getItem("User")!);
    this.buildModals();
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

  
}