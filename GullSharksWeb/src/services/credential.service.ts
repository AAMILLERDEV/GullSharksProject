import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { User } from 'src/models/User';
import { Credentials } from 'src/models/Credentials';

@Injectable({
  providedIn: 'root'
})

export class CredentialService {

  constructor(private sharedService: SharedService) {

  }

  public checkCredentials(user: User, val: string){
    return this.sharedService.upsert(`Credential/CheckCredentials/${val}`, user);
  }

  public upsertCredentials(cred: Credentials){
    return this.sharedService.upsert("Credential/UpsertCredentials", cred);
  }
}
