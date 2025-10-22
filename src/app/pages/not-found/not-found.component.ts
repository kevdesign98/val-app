import { Component } from "@angular/core";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: "./not-found.component.html",
  styleUrl: "./not-found.component.css",
})
export class NotFoundComponent {}
