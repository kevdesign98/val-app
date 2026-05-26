import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { StatsService } from '../../service/stats-services/stats.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weapons-list-dashboard',
  standalone: true,
  imports: [SidebarComponent, FooterComponent],
  templateUrl: './weapons-list-dashboard.component.html',
  styleUrl: './weapons-list-dashboard.component.css'
})
export class WeaponsListDashboardComponent implements OnInit {
  allMatches: any[] = [];
  name: string = '';
  tag: string = '';
  isLoading: boolean = true;

  constructor(
    private statsService: StatsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Recuperiamo i parametri name e tag dall'URL
    this.route.params.subscribe(params => {
      this.name = params['name'];
      this.tag = params['tag'];

      if (this.name && this.tag) {
        this.fetchData();
      }
    });
  }

  fetchData() {
    this.isLoading = true;
    // Usa lo stesso metodo della dashboard per coerenza
    this.statsService.getDashboardData('eu', this.name, this.tag).subscribe({
      next: (res) => {
        this.allMatches = res.matches; // Qui popoliamo i match
        this.isLoading = false;
        console.log('Match caricati nella pagina armi:', this.allMatches.length);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // Il getter che trasforma i match in statistiche armi
  get fullArsenalStats() {
    const stats: any = {};
    let totalKills = 0;

    if (!this.allMatches || this.allMatches.length === 0) return [];

    this.allMatches.forEach(match => {
      // Usiamo match.kills che è l'array dettagliato della v3
      match.kills?.forEach((kill: any) => {
        const killerName = kill.killer_display_name.toLowerCase();
        const myTarget = (this.name + '#' + this.tag).toLowerCase();

        if (killerName === myTarget) {
          const weaponName = kill.damage_weapon_name || 'Ability';
          const weaponIcon = kill.damage_weapon_assets?.display_icon;

          if (!stats[weaponName]) {
            stats[weaponName] = { name: weaponName, kills: 0, icon: weaponIcon };
          }
          stats[weaponName].kills++;
          totalKills++;
        }
      });
    });

    return Object.values(stats)
      .map((w: any) => ({
        ...w,
        usageRate: totalKills > 0 ? ((w.kills / totalKills) * 100).toFixed(1) : 0
      }))
      .sort((a: any, b: any) => b.kills - a.kills);
  }
}