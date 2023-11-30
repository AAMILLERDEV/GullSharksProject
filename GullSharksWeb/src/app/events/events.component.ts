import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventRegistry } from 'src/models/EventRegistry';
import { Events } from 'src/models/Events';
import { User } from 'src/models/User';
import { EventService } from 'src/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public events: Events[] = [];
  public dataReady: boolean = false;
  public user?: User;
  public eventRegistry: EventRegistry[] = [];

  constructor(
    public eventService: EventService,
    public router: Router,
    public toastr: ToastrService
  ){

  }

  async ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("User")!);

    if (!this.user){
      this.router.navigateByUrl("login");
    }
    await this.getData();
    this.dataReady = true;
  }

  public async registerUser(event: Events){
    let eventRegistry: EventRegistry = {
      dateAdded: new Date(),
      event_ID: event.id,
      id: 0,
      isDeleted: false,
      user_ID: this.user!.id
    };

    await this.eventService.upsertEventRegistry(eventRegistry);
    await this.getData();
    this.toastr.success("Success, you've successfully been registered for the event!")
  }

  public async getData(){
    this.eventRegistry = await this.eventService.getEventRegistry(this.user!.id);
    this.events = await this.eventService.getEvents();
    
    this.events = this.events.map(x => {
      x.startDate = new Date(x.startDate).toLocaleString('en-US', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', hour12: true });
      x.endDate = new Date(x.endDate).toLocaleString('en-US', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', hour12: true });
      x.isRegistered = this.eventRegistry.find(y => y.event_ID == x.id) != null;
      return x;
    });

    console.log(this.events);
  }

}
