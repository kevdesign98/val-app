import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { TabViewModule } from 'primeng/tabview';
import { Schedule } from '../../models/schedule';
import { Results } from '../../models/results';
import { ListSchedulesService } from '../../service/esports-services/schedules-services/list-schedules.service';
import { ListResultsService } from '../../service/esports-services/schedules-services/list-results.service';

@Component({
  selector: 'app-list-matches',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, TabViewModule,],
  templateUrl: './list-matches.component.html',
  styleUrl: './list-matches.component.css'
})
// export class ListMatchesComponent {
//   matches: Schedule[] = [];
//   resultMatches: Results[] = [];


//   constructor(private listSchedulesService: ListSchedulesService,
//     private listResultsService: ListResultsService) { }
//   ngOnInit(): void {
//     this.listSchedulesService.getSchedule().subscribe((res) => {
//       this.matches = res.data;
//     });

//     this.listResultsService.getResults().subscribe(res => {
//       this.resultMatches = res.data;
//     });
//   }
// }


export class ListMatchesComponent implements OnInit {
  matches: Schedule[] = [];
  resultMatches: Results[] = [];
  isLoadingSchedules = true;
  isLoadingResults = true;

  constructor(
    private listSchedulesService: ListSchedulesService,
    private listResultsService: ListResultsService
  ) { }

  ngOnInit(): void {
    // Caricamento Schedules
    this.listSchedulesService.getSchedule().subscribe({
      next: (res) => {
        this.matches = res.data;
        this.isLoadingSchedules = false;
        // Opzionale: salva nel sessionStorage per il recupero post-warp
        sessionStorage.setItem('cached_schedules', JSON.stringify(res.data));
      },
      error: (err) => {
        console.error('Portal Error - Schedules:', err);
        this.isLoadingSchedules = false;
      }
    });

    // Caricamento Results
    this.listResultsService.getResults().subscribe({
      next: (res) => {
        this.resultMatches = res.data;
        this.isLoadingResults = false;
        sessionStorage.setItem('cached_results', JSON.stringify(res.data));
      },
      error: (err) => {
        console.error('Portal Error - Results:', err);
        this.isLoadingResults = false;
      }
    });
  }
}