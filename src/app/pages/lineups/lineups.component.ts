import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-lineups',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, SelectModule, FormsModule, DialogModule],
  templateUrl: './lineups.component.html',
  styleUrl: './lineups.component.css',
})
export class LineupsComponent implements OnInit {
  private http = inject(HttpClient);
  allLineups: any[] = [];
  filteredLineups: any[] = [];

  selectedMap: string | null = null;
  selectedAgent: string | null = null;
  selectedSide: string = 'all';

  selectedLineup: any | null = null;
  displayModal: boolean = false;

  // Mappatura delle immagini statiche locali delle mappe
  // Assicurati che i file esistano in 'src/assets/maps/' o modifica con i tuoi path
  mapPreviews: { [key: string]: string } = {
    abyss: 'assets/maps/abyss.png',
    ascent: 'assets/maps/ascent.png',
    bind: 'assets/maps/bind.png',
    breeze: 'assets/maps/breeze.png',
    fracture: 'assets/maps/fracture.png',
    haven: 'assets/maps/haven.png',
    lotus: 'assets/maps/lotus.png',
    pearl: 'assets/maps/pearl.png',
    split: 'assets/maps/split.png',
    sunset: 'assets/maps/sunset.png',
  };

  maps = [
    { label: 'All Maps', value: null },
    { label: 'Abyss', value: 'abyss' },
    { label: 'Ascent', value: 'ascent' },
    { label: 'Bind', value: 'bind' },
    { label: 'Breeze', value: 'breeze' },
    { label: 'Fracture', value: 'fracture' },
    { label: 'Haven', value: 'haven' },
    { label: 'Lotus', value: 'lotus' },
    { label: 'Pearl', value: 'pearl' },
    { label: 'Split', value: 'split' },
    { label: 'Sunset', value: 'sunset' },
    { label: 'Summit', value: 'summit' }
  ];

  agents = [
    { label: 'All Agents', value: null },
    { label: 'Astra', value: 'astra' },
    { label: 'Brimstone', value: 'brimstone' },
    { label: 'Breach', value: 'breach' },
    { label: 'Chamber', value: 'chamber' },
    { label: 'Clove', value: 'clove' },
    { label: 'Cypher', value: 'cypher' },
    { label: 'Deadlock', value: 'deadlock' },
    { label: 'Fade', value: 'fade' },
    { label: 'Gekko', value: 'gekko' },
    { label: 'Harbor', value: 'harbor' },
    { label: 'Iso', value: 'iso' },
    { label: 'Jett', value: 'jett' },
    { label: 'KAY/O', value: 'kayo' },
    { label: 'Killjoy', value: 'killjoy' },
    { label: 'Miks', value: 'miks' },
    { label: 'Neon', value: 'neon' },
    { label: 'Omen', value: 'omen' },
    { label: 'Phoenix', value: 'phoenix' },
    { label: 'Raze', value: 'raze' },
    { label: 'Reyna', value: 'reyna' },
    { label: 'Sage', value: 'sage' },
    { label: 'Skye', value: 'skye' },
    { label: 'Sova', value: 'sova' },
    { label: 'Tejo', value: 'tejo' },
    { label: 'Viper', value: 'viper' },
    { label: 'Veto', value: 'veto' },
    { label: 'Vyse', value: 'vyse' },
    { label: 'Waylay', value: 'waylay' },
    { label: 'Yoru', value: 'yoru' },
  ];

  ngOnInit(): void {
    this.loadLineups();
  }

  loadLineups(): void {
    this.http.get<any[]>('data/lineups.json').subscribe({
      next: (data) => {
        this.allLineups = data;
        this.filteredLineups = [...this.allLineups];
      },
      error: (err) => {
        console.error('Errore nel caricamento del file JSON delle lineups:', err);
      }
    });
  }

  /**
    * Restituisce l'immagine statica della mappa dalla cartella assets.
    * Utilizza il nome della mappa presente nel lineup per comporre il path.
    */
  getLineupPreview(lineup: any): string {
    if (!lineup?.map) {
      return 'assets/maps/default.png';
    }

    const mapKey = lineup.map.toLowerCase().trim();

    // Se la mappa è registrata in mapPreviews prende il path definito, 
    // altrimenti genera dinamicamente il path basato sul nome della mappa
    return this.mapPreviews[mapKey] || `assets/maps/${mapKey}.png`;
  }

  setSide(side: string): void {
    this.selectedSide = side;
    this.filterLineups();
  }

  filterLineups(): void {
    this.filteredLineups = this.allLineups.filter(lineup => {
      const matchMap = !this.selectedMap ||
        lineup.map?.toLowerCase() === this.selectedMap.toLowerCase();

      const matchAgent = !this.selectedAgent ||
        lineup.agent?.name?.toLowerCase() === this.selectedAgent.toLowerCase();

      const matchSide = this.selectedSide === 'all' ||
        lineup.side?.toLowerCase() === this.selectedSide.toLowerCase();

      return matchMap && matchAgent && matchSide;
    });
  }

  openLineupDetails(lineup: any): void {
    this.selectedLineup = lineup;
    this.displayModal = true;
  }

  closeLineupDetails(): void {
    this.displayModal = false;
    this.selectedLineup = null;
  }
}