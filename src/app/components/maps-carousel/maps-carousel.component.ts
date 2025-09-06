import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { CarouselModule } from "primeng/carousel";
import { CardModule } from "primeng/card";
import { RouterModule, Router } from "@angular/router";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-maps-carousel",
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CarouselModule,
    CardModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: "./maps-carousel.component.html",
  styleUrl: "./maps-carousel.component.css",
  host: { ngSkipHydration: "true" },
})
export class MapsCarouselComponent {
  constructor(private router: Router) { }
  maps = [
    { name: "Ascent", slug: "ascent", image: "assets/maps/ascent.png" },
    { name: "Bind", slug: "bind", image: "assets/maps/bind.png" },
    { name: "Split", slug: "split", image: "assets/maps/split.png" },
    { name: "Pearl", slug: "pearl", image: "assets/maps/pearl.png" },
  ];

  responsiveOptions = [
    { breakpoint: "1024px", numVisible: 1, numScroll: 1 },
    { breakpoint: "768px", numVisible: 1, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  goToMaps() {
    this.router.navigate(["/maps"]);
  }
}
