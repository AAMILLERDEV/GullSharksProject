import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/models/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  public user?: User;

  constructor (public userService: UserService,
    public toastr: ToastrService,
    public router: Router) {

  }


  public async ngOnInit(){

    this.user = JSON.parse(sessionStorage.getItem("User")!);
    
    if (!this.user){
      this.router.navigateByUrl("login");
    }

    this.toastr.success("Hello!");
  }
}
