import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AgentsCarouselComponent } from "../../components/agents-carousel/agents-carousel.component";
import { MapsCarouselComponent } from "../../components/maps-carousel/maps-carousel.component";
import { ListSchedulesService } from '../../service/esports-services/schedules-services/list-schedules.service';
import { Match } from "../../models/match.results";
@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    RouterLink,
    FooterComponent,
    AgentsCarouselComponent,
    MapsCarouselComponent
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {

  results: any[] = [];
  topMatches: Match[] = [];


  constructor(private listSchedulesService: ListSchedulesService) { }

  ngOnInit(): void {
    this.listSchedulesService.getSchedule().subscribe((res) => {
      const matches = res.data.slice(0, 3); // prendi solo i primi 3
      this.topMatches = matches.map((match: any) => {
        return {
          status: match.status, // LIVE o Upcoming
          team1: match.teams[0]?.name || 'TBD',
          team2: match.teams[1]?.name || 'TBD',
          event: match.event
        };
      });
    });
  }



  responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
