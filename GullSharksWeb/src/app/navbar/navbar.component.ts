import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/models/User';
import { UserService } from 'src/services/user.service';
import { OffcanvasComponent } from '../offcanvas/offcanvas.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user?: User;

  @Output() open: EventEmitter<any> = new EventEmitter();

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

  public showOffCanvas(){
    this.open.emit();
  }
}
