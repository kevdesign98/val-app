import { Component, OnInit } from '@angular/core';
// import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MapsDetailsService } from '../../service/maps-details-services/maps-details.service';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
 
@Component({
  selector: 'app-map-strat',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule,CardModule,DividerModule],
  templateUrl: './map-strat.component.html',
  styleUrl: './map-strat.component.css'
})


export class MapStratComponent implements OnInit {
  map: any;

  constructor(
    private route: ActivatedRoute,
    private mapsDetailsService: MapsDetailsService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    const maps = this.mapsDetailsService.getMapsDetails;
    this.map = maps.find(m => m.slug === slug);
  }
}