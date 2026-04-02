import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-esports',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './esports.component.html',
  styleUrl: './esports.component.css'
})
export class EsportsComponent {
  teams = [
    {
      id: 1,
      name: 'Fnatic',
      image: 'https://vctstats.com/images/teams/fnc.png',
    },
    {
      id: 2,
      name: 'Sentinels',
      image: 'https://vctstats.com/images/teams/sen.png',
    },
    {
      id: 3,
      name: 'Team Heretics',
      image: 'https://vctstats.com/images/teams/th.png',
    },
    {
      id: 4,
      name: 'Team Vitality',
      image: 'https://vctstats.com/images/teams/vit.png',
    },
  ]
}