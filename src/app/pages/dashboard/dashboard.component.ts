import { Component } from '@angular/core';
import { AuthservicesService } from '../../service/authservices/authservices.service';
import { StatsService } from '../../service/stats-services/stats.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  account: any;
  mmr: any;
  lifetime: any;
  matches: any;
  name: string;
  tag: string;

  constructor(private auth: AuthservicesService, private stats: StatsService) {
    this.name = '';
    this.tag = '';
  }

  ngOnInit() {
    this.stats.getAccount(this.name, this.tag).subscribe(data => this.account = data);
    this.stats.getMMR(this.name, this.tag).subscribe(data => this.mmr = data);
    this.stats.getLifetimeStats(this.name, this.tag).subscribe(data => this.lifetime = data);
    this.stats.getMatchHistory(this.name, this.tag).subscribe(data => this.matches = data);
  }
  logout() {
    this.auth.logout();
  }
}
