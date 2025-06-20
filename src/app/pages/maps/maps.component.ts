import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
@Component({
  selector: "app-maps",
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: "./maps.component.html",
  styleUrl: "./maps.component.css",
})
export class MapsComponent {}
