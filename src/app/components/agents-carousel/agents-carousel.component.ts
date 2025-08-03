import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { CarouselModule } from "primeng/carousel";
import { CardModule } from "primeng/card";
import { RouterModule, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-agents-carousel",
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CarouselModule,
    CardModule,
    RouterModule,
  ],
  templateUrl: "./agents-carousel.component.html",
  styleUrl: "./agents-carousel.component.css",
  host: { ngSkipHydration: "true" },
})
export class AgentsCarouselComponent implements OnInit {
  agents: any = [];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>("https://valorant-api.com/v1/agents").subscribe((res) => {
      const allAgents = res.data;
      this.agents = allAgents
        .filter((agent: any) => agent.isPlayableCharacter)
        .slice(0, 4); // mostra solo 4 agenti
    });
  }
  responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  goToAgent(uuid: string) {
    this.router.navigate(["/agents", uuid]);
  }
}
