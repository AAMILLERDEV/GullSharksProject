import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Events } from 'src/models/Events';

@Injectable({
  providedIn: 'root'
})

export class GameCategoryService {

  constructor(private sharedService: SharedService) {

  }

  public GetGameCategories(){
    return this.sharedService.get(`GameCategory/GetGameCategory`);
  }
  
}
