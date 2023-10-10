import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Events } from 'src/models/Events';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor(private sharedService: SharedService) {

  }

  public getEvents(){
    return this.sharedService.get(`Event/GetEvents`);
  }

  public upsertEvent(event: Events){
    return this.sharedService.upsert(`Event/UpsertEvent`, event);
  }
}
