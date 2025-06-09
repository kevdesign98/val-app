import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { CarouselModule } from "primeng/carousel";
import { CardModule } from "primeng/card";
import { RouterModule, Router } from "@angular/router";

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
export class AgentsCarouselComponent {
  constructor(private router: Router) {}
  
  agents = [
    { name: "Reyna", slug: "reyna", image: "assets/agents/reyna.png" },
    { name: "Jett", slug: "jett", image: "assets/agents/jett.png" },
    { name: "Phoenix", slug: "phoenix", image: "assets/agents/phoenix.png" },
    { name: "Sova", slug: "sova", image: "assets/agents/sova.png" },
  ];

  responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  goToAgent(slug: string) {
    this.router.navigate(["/agents", slug]);
  }
}
