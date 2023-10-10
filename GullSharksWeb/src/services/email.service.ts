import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  constructor(private sharedService: SharedService) {

  }

  public sendValidationEmail(user: User){
    return this.sharedService.upsert(`Email/SendValidationEmail`, user);
  }

  public sendResetPasswordEmail(user: User){
    return this.sharedService.upsert(`Email/SendResetPasswordEmail`, user);
  }
}
