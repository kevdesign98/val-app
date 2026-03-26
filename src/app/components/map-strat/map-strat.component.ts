import { Component, OnInit, PLATFORM_ID, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MapsService } from "../../service/maps-services/maps.service";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';

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

  private platformId = inject(PLATFORM_ID);

  competitiveMaps = [
    "Abyss", "Ascent", "Breeze", "Bind", "Corrode",
    "Fracture", "Haven", "Icebox", "Lotus", "Pearl",
    "Split", "Sunset"
  ];

  maps: any[] = [];
  currentIndex: number = 0;
  prevMap: any = null;
  nextMap: any = null;

  constructor(private route: ActivatedRoute, private mapService: MapsService) { }

  ngOnInit(): void {
    // Eseguiamo la logica solo sul browser per evitare errori NG0505
    if (isPlatformBrowser(this.platformId)) {
      this.mapService.getAllMaps().subscribe((res) => {
        this.maps = res.filter((m: any) =>
          this.competitiveMaps.includes(m.displayName)
        );

        this.route.paramMap.subscribe((params) => {
          const uuid = params.get("uuid");
          if (uuid) {
            this.mapUuid = uuid;
            this.loadMapData(this.mapUuid);
          }
        });
      });
    }
  }

  loadMapData(uuid: string) {
    this.mapService.getMapByUuid(uuid).subscribe((data) => {
      this.map = data;
      this.callouts = data.callouts || [];
      this.selectedCallout = null;

      this.currentIndex = this.maps.findIndex((m) => m.uuid === uuid);
      this.prevMap = this.maps[this.currentIndex - 1] || null;
      this.nextMap = this.maps[this.currentIndex + 1] || null;
    });
  }


  // Correzione definitiva delle funzioni di normalizzazione
  normalizeX(y: number): number {
    if (!this.map || !this.map.xMultiplier) return 0;

    // Formula: (Coordinata_Y_API * Multiplier) + Offset
    // Moltiplichiamo per 100 per ottenere la percentuale CSS 'left'
    const leftPercent = (y * this.map.xMultiplier + this.map.xScalarOffset) * 100;
    return leftPercent;
  }

  normalizeY(x: number): number {
    if (!this.map || !this.map.yMultiplier) return 0;

    // Formula: (Coordinata_X_API * Multiplier) + Offset
    // Moltiplichiamo per 100 per ottenere la percentuale CSS 'top'
    const topPercent = (x * this.map.yMultiplier + this.map.yScalarOffset) * 100;
    return topPercent;
  }

  selectCallout(callout: any): void {
    this.selectedCallout = callout;
    if (window.innerWidth < 1024) {
      // Scroll verso la mappa su mobile per vedere il punto selezionato
      const mapElement = document.querySelector('.max-w-\\[700px\\]');
      mapElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}