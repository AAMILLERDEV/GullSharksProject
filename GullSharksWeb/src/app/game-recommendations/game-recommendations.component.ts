import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Game } from 'src/models/Game';
import { User } from 'src/models/User';

@Component({
  selector: 'app-game-recommendations',
  templateUrl: './game-recommendations.component.html',
  styleUrls: ['./game-recommendations.component.css']
})
export class GameRecommendationsComponent implements OnInit {

  public gameRecommendations: Game[] = [];
  @Input() public games: Game[] = [];
  @Input() public selectedGame!: Game;
  public customOptions!: OwlOptions;
  public user?: User;
  
  public ready: boolean = false;

  constructor(){

  }

  async ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("User")!);
    console.log(this.games);
    this.ready = true;

    this.customOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      autoWidth: true,
      autoHeight: true,
      dots: false,
      navSpeed: 700,
      navText: [ '<i class="bi bi-arrow-bar-left text-dark"> Previous</i>', '<i class="bi bi-arrow-bar-right text-dark"> Next</i>' ],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        }
      },
      nav: true
    }
  }

  public goToDetails(url: string){
    window.location.href = url;
  }



  
}
