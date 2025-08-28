import { Component, OnInit } from '@angular/core';
// import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MapsService } from '../../service/maps-services/maps.service';
// import { MapsDetailsService } from '../../service/maps-details-services/maps-details.service';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-map-strat',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, CardModule, DividerModule,TooltipModule],
  templateUrl: './map-strat.component.html',
  styleUrl: './map-strat.component.css'
})


export class MapStratComponent implements OnInit {
  map: any = null;
  callouts: any[] = [];
  selectedCallout: any = null;

  constructor(
    private route: ActivatedRoute,
    private mapsService: MapsService
  ) { }

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get("uuid");
    if (uuid) {
      this.mapsService.getMapByUuid(uuid).subscribe({
        next: (res) => {
          this.map = res.data;
          this.callouts = res.data.callouts || [];
        },
        error: (err) => console.error("Errore caricamento mappa:", err)
      });
    }
  }
  selectCallout(callout: any) {
    this.selectedCallout = callout;
  }
}