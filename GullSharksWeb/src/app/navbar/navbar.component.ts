import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/models/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user?: User;

  constructor (public userService: UserService,
    public toastr: ToastrService,
    public router: Router) {

  }


  public async ngOnInit(){

    this.user = JSON.parse(sessionStorage.getItem("User")!);
    
  }

  public logout(){
    sessionStorage.removeItem("User");
    this.router.navigateByUrl("login");
  }
}
