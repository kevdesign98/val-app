import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapsService } from '../../service/maps-services/maps.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
// import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-map-strat',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './map-strat.component.html',
  styleUrls: ['./map-strat.component.css'],
})
export class MapStratComponent implements OnInit {
  map: any;
  callouts: any[] = [];
  mapUuid!: string;
  selectedCallout: any = null;

  constructor(
    private route: ActivatedRoute,
    private Mapsservice: MapsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.mapUuid = params.get('uuid')!;
      this.loadMapData(this.mapUuid);
    });
  }

  loadMapData(uuid: string) {
    this.Mapsservice.getMapByUuid(uuid).subscribe((data) => {
      this.map = data;
      this.callouts = data.callouts || [];
    });
  }

  /** Normalizza Y perché nei CSS 0 è in alto */
  normalizeY(y: number, imageWidth: number = 600): number {
    return imageWidth - y / 5;
  }

  normalizeX(x: number, imageHeight: number = 600): number {
    return imageHeight - x / 5;
  }

  selectCallout(callout: any): void {
    this.selectedCallout = callout;
  }

  isSelected(callout: any): boolean {
    return false; // qui poi posso gestire la selezione
  }

  nextMap() {
    console.log('TODO: Vai alla prossima mappa');
  }
}