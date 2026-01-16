import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MapsService } from "../../service/maps-services/maps.service";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-map-strat",
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink],
  templateUrl: "./map-strat.component.html",
  styleUrls: ["./map-strat.component.css"],
})
export class MapStratComponent implements OnInit {
  map: any;
  callouts: any[] = [];
  mapUuid!: string;
  selectedCallout: any = null;

  // Elenco mappe competitive (mantenuto l'ordine per prev/next)
  competitiveMaps = [
    "Abyss",
    "Ascent",
    "Breeze",
    "Bind",
    "Corrode",
    "Fracture",
    "Haven",
    "Icebox",
    "Lotus",
    "Pearl",
    "Split",
    "Sunset",
  ];

  maps: any[] = [];
  currentIndex: number = 0;
  prevMap: any = null;
  nextMap: any = null;

  constructor(private route: ActivatedRoute, private mapService: MapsService) {}

  ngOnInit(): void {
    // 1. Carichiamo prima tutte le mappe per gestire la navigazione prev/next
    this.mapService.getAllMaps().subscribe((res) => {
      this.maps = res.filter((m: any) =>
        this.competitiveMaps.includes(m.displayName)
      );

      // 2. Ascoltiamo i cambi di parametro nell'URL
      this.route.paramMap.subscribe((params) => {
        const uuid = params.get("uuid");
        if (uuid) {
          this.mapUuid = uuid;
          this.loadMapData(this.mapUuid);
        }
      });
    });
  }

  loadMapData(uuid: string) {
    this.mapService.getMapByUuid(uuid).subscribe((data) => {
      // Nota: 'data' qui deve contenere xMultiplier, yMultiplier, xScalarOffset, yScalarOffset
      this.map = data;
      this.callouts = data.callouts || [];

      // Reset del callout selezionato al cambio mappa
      this.selectedCallout = null;

      // Aggiorniamo la logica prev/next basata sul nuovo UUID
      this.currentIndex = this.maps.findIndex((m) => m.uuid === uuid);
      this.prevMap = this.maps[this.currentIndex - 1] || null;
      this.nextMap = this.maps[this.currentIndex + 1] || null;
    });
  }

  /**
   * BUG FIX: LOGICA DI NORMALIZZAZIONE COORDINATE
   * Le coordinate dell'API sono spaziali.
   * Usiamo xMultiplier e xScalarOffset forniti da Riot per mappare i punti sull'immagine.
   */

  normalizeX(x: number): number {
    if (!this.map || !this.map.xMultiplier) return 0;

    // Formula Valorant API: (y * multiplier) + scalar
    // Usiamo il valore 'y' dell'API per l'asse X della mappa in alcuni casi,
    // ma solitamente l'API di Valorant-API.com ha già i nomi corretti.
    const multiplier = this.map.xMultiplier;
    const scalar = this.map.xScalarOffset;

    // Restituiamo la percentuale (0-100)
    return (x * multiplier + scalar) * 100;
  }

  normalizeY(y: number): number {
    if (!this.map || !this.map.yMultiplier) return 0;

    const multiplier = this.map.yMultiplier;
    const scalar = this.map.yScalarOffset;

    // Restituiamo la percentuale (0-100)
    return (y * multiplier + scalar) * 100;
  }

  selectCallout(callout: any): void {
    this.selectedCallout = callout;
    // Opzionale: scroll automatico verso la mappa su mobile
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  }

  isSelected(callout: any): boolean {
    return this.selectedCallout === callout;
  }
}
