import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MapsService } from "../../service/maps-services/maps.service";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-maps",
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: "./maps.component.html",
  styleUrl: "./maps.component.css",
})
export class MapsComponent implements OnInit {
  maps: any[] = [];


  compMaps = ["Abyss", "Ascent", "Bind", "Breeze", "Fracture",
    "Haven", "Icebox", "Lotus", "Pearl", "Split", "Sunset"];



  constructor(private mapsService: MapsService) { }

  ngOnInit(): void {
    this.mapsService.getAllMaps().subscribe({
      next: (res) => {
        this.maps = res.data.filter((map: any) => this.compMaps.includes(map.displayName));
      },
      error: (err) => console.error("Errore nel caricamento mappe:", err)
    });
  }
}