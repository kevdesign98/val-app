import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CarouselModule } from 'primeng/carousel';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-esports',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CarouselModule, RouterLink],
  templateUrl: './esports.component.html',
  styleUrl: './esports.component.css'
})
export class EsportsComponent {
  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  teams = [
    { id: 1, name: 'Fnatic', image: 'https://vctstats.com/images/teams/fnc.png' },
    { id: 2, name: 'Sentinels', image: 'https://vctstats.com/images/teams/sen.png' },
    { id: 3, name: 'Team Heretics', image: 'https://vctstats.com/images/teams/th.png' },
    { id: 4, name: 'Team Vitality', image: 'https://vctstats.com/images/teams/vit.png' }
  ];

  proPlayers = [
    {
      name: 'TenZ',
      team: 'T1',
      teamLogo: 'assets/esports/teams-logo/T1.png',
      picture: 'assets/esports/players/Tenz.png',
      stats: { sens: '0.24', dpi: '1600' },
      crosshair: '0;s;1;P;c;5;o;0;f;0;0l;2;0v;2;0g;1;0o;1;0a;1;0f;0;1b;0'
    },
    {
      name: 'Boaster',
      team: 'Fnatic',
      teamLogo: 'assets/esports/teams-logo/FNC.png',
      picture: 'assets/esports/players/Boaster.png',
      stats: { sens: '0.24', dpi: '800' },
      crosshair: '0;s;1;P;c;1;o;1;d;1;0l;0;0o;2;0a;1;0f;0;1t;0;1l;0;1o;0;1a;0;S;c;1;o;1'
    },
    {
      name: 'Aspas',
      team: 'MIBR',
      teamLogo: 'assets/esports/teams-logo/MIBR.png',
      picture: 'assets/esports/players/aspas.png',
      stats: { sens: '0.4', dpi: '800' },
      crosshair: '0;P;h;0;0l;4;0o;0;0a;1;0f;0;1b;0'
    },
    {
      name: 'Derke',
      team: 'Team Vitality',
      teamLogo: 'assets/esports/teams-logo/VIT.png',
      picture: 'assets/esports/players/derke.png',
      stats: { sens: '0.74', dpi: '400' },
      crosshair: '0;P;o;1;0t;1;0l;4;0o;2;0a;1;0f;0;1t;0;1l;1;1o;0;1a;1;1m;0;1f;0'
    },
    {
      name: 'Forsaken',
      team: 'PRX',
      teamLogo: 'assets/esports/teams-logo/PRX.png',
      picture: 'assets/esports/players/f0rsakeN.png',
      stats: { sens: '0.712', dpi: '800' },
      crosshair: '0;p;0;c;1;s;1;P;h;0;f;0;s;0;0l;3;0v;3;0g;1;0o;0;0a;1;0f;0;1b;0;A;o;1;d;1;0b;0;1b;0;S;d;0'
    },
    {
      name: 'ZmjjKK',
      team: 'EDG',
      teamLogo: 'assets/esports/teams-logo/EDG.png',
      picture: 'assets/esports/players/zmjkk.png',
      stats: { sens: '0.1', dpi: '1600' },
      crosshair: '0;P;h;0;d;1;f;0;0l;2;0v;2;0g;1;0o;1;0f;0;1b;0'
    },
    {
      name: 'Zekken',
      team: 'MIBR',
      teamLogo: 'assets/esports/teams-logo/MIBR.png',
      picture: 'assets/esports/players/Zekken.png',
      stats: { sens: '0.175', dpi: '1600' },
      crosshair: '0;s;1;P;c;1;t;2;o;1;d;1;0b;0;1b;0;S;b;1;c;8;s;0.823'
    },
    {
      name: 'Alfajer',
      team: 'FNATIC',
      teamLogo: 'assets/esports/teams-logo/FNC.png',
      picture: 'assets/esports/players/Alfajer.png',
      stats: { sens: '0.45', dpi: '400' },
      crosshair: '0;p;0;s;1;P;h;0;f;0;0l;2;0o;2;0a;1;0f;0;1b;0;A;c;5;o;1;d;1;0b;0;1b;0;S;s;0.628;o;1'
    }
  ];

  copyCrosshair(code: string) {
    navigator.clipboard.writeText(code);
    // Qui puoi agganciare un toast se preferisci
  }
}