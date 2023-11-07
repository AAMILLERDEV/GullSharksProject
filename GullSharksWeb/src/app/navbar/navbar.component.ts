import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/models/User';
import { UserService } from 'src/services/user.service';
import { CartItem } from 'src/models/CartItem';
import * as bootstrap from 'bootstrap';
import { Wishlist } from 'src/models/Wishlist';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user?: User;
  public cart: CartItem[] = [];
  public wishlist: Wishlist[] = [];
  public offcanvasMenu?: bootstrap.Offcanvas;

  @Input() public showingHome: boolean = false;

  @Output() openCart: EventEmitter<any> = new EventEmitter();
  @Output() openWishlist: EventEmitter<any> = new EventEmitter();
  @Output() filterVal: EventEmitter<any> = new EventEmitter();

  constructor (public userService: UserService,
    public toastr: ToastrService,
    public router: Router) {

  }

  public async ngOnInit(){
    this.user = JSON.parse(sessionStorage.getItem("User")!);
    this.offcanvasMenu = new bootstrap.Offcanvas(document.getElementById("offcanvasMenu")!, {backdrop: false});
    this.offcanvasMenu!.show();
  }

  public async getData(){
    this.cart = JSON.parse(sessionStorage.getItem("cart")!);
    this.wishlist = JSON.parse(sessionStorage.getItem("wishlist")!);
  }

  public showCanvas(){
    this.offcanvasMenu!.show();
  }

  public logout(){
    sessionStorage.removeItem("User");
    this.router.navigateByUrl("login");
  }

  public showOffCanvas(){
    this.openCart.emit();
  }

  public showWishlistOffCanvas(){
    this.openWishlist.emit();
  }

  public searchForGames(val: string){
    this.filterVal.emit(val);
  }
}
