import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AgentsCarouselComponent } from "../../components/agents-carousel/agents-carousel.component";
import { MapsCarouselComponent } from "../../maps-carousel/maps-carousel.component";
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
export class HomeComponent {
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
