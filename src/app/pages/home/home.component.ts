import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AgentsCarouselComponent } from "../../components/agents-carousel/agents-carousel.component";
import { CarouselModule } from "primeng/carousel";
import { ListSchedulesService } from "../../service/esports-services/schedules-services/list-schedules.service";
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
    CarouselModule, // Aggiunto per gestire il carousel delle mappe in Home
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  results: any[] = [];
  topMatches: Match[] = [];

  // Dati delle mappe spostati qui per gestire lo sfondo immersivo
  activeMapImage: string = "";
  // maps: any[] = [
  //   { name: 'Bind', image: 'assets/maps/bind.png' },
  //   { name: 'Haven', image: 'assets/maps/haven.png' },
  //   { name: 'Split', image: 'assets/maps/split.png' },
  //   { name: 'Ascent', image: 'assets/maps/ascent.png' }
  // ];

  maps: any[] = [
    {
      name: "Ascent",
      image:
        "https://media.valorant-api.com/maps/7eae2353-4c6c-9c77-f173-9a06ed8b0437/splash.png",
      color: "#6366f1",
    },
    {
      name: "Bind",
      image:
        "https://media.valorant-api.com/maps/2c9dbf58-4553-24da-94c5-9a474740124e/splash.png",
      color: "#f59e0b",
    },
    {
      name: "Haven",
      image:
        "https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7f16e9d6f2dc/splash.png",
      color: "#10b981",
    },
    {
      name: "Icebox",
      image:
        "https://media.valorant-api.com/maps/e2ad3094-41f1-8151-5c68-cd84f64383c2/splash.png",
      color: "#06b6d4",
    },
  ];

  constructor(private listSchedulesService: ListSchedulesService) {}

  ngOnInit(): void {
    // Inizializza lo sfondo con la prima mappa
    if (this.maps.length > 0) {
      this.activeMapImage = this.maps[0].image;
    }

    // Tua logica esistente per gli Esports
    this.listSchedulesService.getSchedule().subscribe((res) => {
      const matches = res.data.slice(0, 3);
      this.topMatches = matches.map((match: any) => {
        return {
          status: match.status,
          team1: match.teams[0]?.name || "TBD",
          team2: match.teams[1]?.name || "TBD",
          event: match.event,
        };
      });
    });
  }

  // Funzione per aggiornare lo sfondo quando il carousel cambia slide
  onMapChange(event: any) {
    const currentIndex = event.page;
    if (this.maps[currentIndex]) {
      this.activeMapImage = this.maps[currentIndex].image;
    }
  }

  responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 3 },
    { breakpoint: "768px", numVisible: 2, numScroll: 2 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];
}
