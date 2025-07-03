import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MapsService } from "../../service/maps-services/maps.service";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-maps",
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent,CommonModule],
  templateUrl: "./maps.component.html",
  styleUrl: "./maps.component.css",
})
export class MapsComponent {
  maps: any[] = [];

  constructor(private mapsService: MapsService) {
    this.maps = this.mapsService.getAllMaps();
  }

}
