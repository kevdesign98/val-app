import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MapsService } from "../../service/maps-services/maps.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-maps",
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, CommonModule,],
  templateUrl: "./maps.component.html",
  styleUrl: "./maps.component.css"
})
export class MapsComponent implements OnInit {
  maps: any[] = [];

  // Mappe competitive
  compMaps = [
    "Abyss",
    "Ascent",
    "Bind",
    "Breeze",
    "Corrode",
    "Fracture",
    "Haven",
    "Icebox",
    "Lotus",
    "Pearl",
    "Split",
    "Sunset",
  ];

  constructor(private mapsService: MapsService) { }

  ngOnInit(): void {
    this.mapsService.getAllMaps().subscribe({
      next: (maps: any[]) => {
        this.maps = maps
          .filter((map: any) => this.compMaps.includes(map.displayName))
          .sort((a, b) => a.displayName.localeCompare(b.displayName)); // Opzionale: ordine alfabetico
      },
      error: (err) => console.error("Errore nel caricamento mappe:", err),
    });
  }
}
