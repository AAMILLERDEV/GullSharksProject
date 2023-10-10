import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  public users?: User[] = [];
  public username: string = "";
  public successful = false;

  constructor(public activeRoute: ActivatedRoute,
    public router: Router,
    public userService: UserService
    ){

  }

  async ngOnInit() {
    this.users = await this.userService.getAllUsers();
    let usernameFromURL = decodeURIComponent(this.activeRoute.snapshot.paramMap.get('username')!);
    if (usernameFromURL){
      let user = this.users?.find(x => x.username == atob(usernameFromURL!));
      if (user){
        if (user.isValidated){
          return;
        }
        await this.validateUser(user);
      }
    }
  }

  public async validateUser(user: User){
    user.isValidated = true;
    let res = await this.userService.upsertUser(user);
    if (res == user.id){
      this.successful = true;
    }
  }
}
