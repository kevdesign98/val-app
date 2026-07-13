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
      teamLogo: 'https://vctstats.com/images/teams/t1.png',
      picture: 'assets/esports/players/tenz.png',
      role: 'Duelist',
      stats: { acs: '230', hsPercent: '28.5%' },
      crosshair: '0;s;1;P;c;5;h;0;m;1;0l;4;0v;4;0o;2;0a;1;0f;0;1b;0;S;c;4;s;0.8;o;1'
    },
    {
      name: 'Boaster',
      team: 'Fnatic',
      teamLogo: 'https://vctstats.com/images/teams/fnc.png',
      picture: 'assets/esports/players/boaster.png',
      role: 'Flex',
      stats: { acs: '215', hsPercent: '26.2%' },
      crosshair: '0;P;c;7;h;0;f;0;0l;4;0v;4;0o;2;0a;1;0f;0;1b;0'
    },
    {
      name: 'Aspas',
      team: 'Leviatán',
      teamLogo: 'https://vctstats.com/images/teams/lev.png',
      picture: 'assets/esports/players/aspas.png',
      role: 'Duelist',
      stats: { acs: '254', hsPercent: '24.8%' },
      crosshair: '0;P;c;5;o;1;d;1;z;3;f;0;0t;1;0l;1;0o;1;0a;1;0f;0;1b;0'
    },
    {
      name: 'Derke',
      team: 'Team Vitality',
      teamLogo: 'https://vctstats.com/images/teams/vit.png',
      picture: 'assets/esports/players/derke.png',
      role: 'Duelist',
      stats: { acs: '242', hsPercent: '25.9%' },
      crosshair: '0;P;o;1;d;1;0b;0;1b;0'
    },
    {
      name: 'Forsaken',
      team: 'PRX',
      teamLogo: 'https://vctstats.com/images/teams/prx.png',
      picture: 'assets/esports/players/forsaken.png',
      role: 'Duelist',
      stats: { acs: '242', hsPercent: '25.9%' },
      crosshair: '0;P;o;1;d;1;0b;0;1b;0'
    },
    {
      name: 'Demon1',
      team: 'Envy',
      teamLogo: 'https://vctstats.com/images/teams/envy.png',
      picture: 'assets/esports/players/demon1.png',
      role: 'Duelist',
      stats: { acs: '242', hsPercent: '25.9%' },
      crosshair: '0;P;o;1;d;1;0b;0;1b;0'
    },
    {
      name: 'Zekken',
      team: 'MIBR',
      teamLogo: 'https://vctstats.com/images/teams/mibr.png',
      picture: 'assets/esports/players/zekken.png',
      role: 'Duelist',
      stats: { acs: '242', hsPercent: '25.9%' },
      crosshair: '0;P;o;1;d;1;0b;0;1b;0'
    },
    {
      name: 'Alfajer',
      team: 'FNATIC',
      teamLogo: 'https://vctstats.com/images/teams/fnatic.png',
      picture: 'assets/esports/players/alfajer.png',
      role: 'Duelist',
      stats: { acs: '242', hsPercent: '25.9%' },
      crosshair: '0;P;o;1;d;1;0b;0;1b;0'
    }
  ];

  copyCrosshair(code: string) {
    navigator.clipboard.writeText(code);
    // Qui puoi agganciare un toast se preferisci
  }
}