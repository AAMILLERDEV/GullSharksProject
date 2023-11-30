import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Events } from 'src/models/Events';
import { EventRegistry } from 'src/models/EventRegistry';

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

  public getEventRegistry(user_ID: number){
    return this.sharedService.get(`Event/GetEventRegistry/${user_ID}`);
  }

  public upsertEventRegistry(event: EventRegistry){
    return this.sharedService.upsert(`Event/UpsertEventRegistry`, event);
  }
}
