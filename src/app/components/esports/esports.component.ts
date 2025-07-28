import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { TabViewModule } from 'primeng/tabview';
import { Schedule } from '../../models/schedule';
import { Results } from '../../models/results';
import { ListSchedulesService } from '../../service/esports-services/schedules-services/list-schedules.service';
import { ListResultsService } from '../../service/esports-services/schedules-services/list-results.service';

@Component({
  selector: 'app-esports',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, TabViewModule,],
  templateUrl: './esports.component.html',
  styleUrl: './esports.component.css'
})
export class EsportsComponent implements OnInit {

  matches: Schedule[] = [];
  resultMatches: Results[] = [];


  constructor(private listSchedulesService: ListSchedulesService, 
              private listResultsService: ListResultsService) { }
  ngOnInit(): void {
    this.listSchedulesService.getSchedule().subscribe((res) => {
      this.matches = res.data;
    });

    this.listResultsService.getResults().subscribe(res => {
      this.resultMatches = res.data;
    });
  }


}
