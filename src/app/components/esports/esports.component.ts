import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { TabViewModule } from 'primeng/tabview';
// import { TabsModule } from 'primeng/tabs';
import { ListResultsService } from '../../service/esports-services/list-results.service';
import { TestResult } from '../../models/test-result';

@Component({
  selector: 'app-esports',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, TabViewModule, ],
  templateUrl: './esports.component.html',
  styleUrl: './esports.component.css'
})
export class EsportsComponent implements OnInit {

  matches: TestResult[] = [];


  constructor(private listResultsService: ListResultsService) { }
  ngOnInit(): void {
    this.listResultsService.getSchedule().subscribe((res) => {
      console.log('RES:', res);           //  stampa l’intera risposta
      console.log('res.data:', res.data); //  stampa la parte che assegni a matches
      this.matches = res.data;
    });
  }


}
