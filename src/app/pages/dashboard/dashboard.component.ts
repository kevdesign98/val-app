import { Component, OnInit } from '@angular/core';
import { AuthservicesService } from '../../service/authservices/authservices.service';
import { StatsService } from '../../service/stats-services/stats.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  name: string;
  tag: string;
  account: any;
  mmr: any;
  lifetime: any;
  matches: any;

  constructor(
    private auth: AuthservicesService,
    private stats: StatsService,
    private router: Router // <--- Inietta il Router
  ) {
    // 1. Recuperiamo i dati passati dal login
    const navigation = this.router.getCurrentNavigation();
    const playerData = navigation?.extras.state?.['playerData'];

    if (playerData && playerData.data) {
      // 2. Assegniamo i valori reali (es. Jett e EUW)
      this.name = playerData.data.name;
      this.tag = playerData.data.tag;
    } else {
      // 3. Fallback se l'utente arriva qui senza passare dal login
      this.name = '';
      this.tag = '';
    }
  }
  ngOnInit() {
    const savedUser = localStorage.getItem('vlr_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.name = user.name;
      this.tag = user.tag;

      // Chiamate API
      this.stats.getAccount(this.name, this.tag).subscribe(res => {
        this.account = res;
        console.log("Dati Account:", res);
      });

      this.stats.getMMR(this.name, this.tag).subscribe(res => {
        this.mmr = res;
        console.log("Dati MMR:", res);
      });

      this.stats.getMatchHistory(this.name, this.tag).subscribe(res => {
        this.matches = res;
        console.log("Dati Match:", res);
      });
    }
  }
  logout() {
    this.auth.logout();
  }
}