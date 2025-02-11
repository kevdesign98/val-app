import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { AgentsComponent } from '../agents/agents.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MapsComponent } from "../maps/maps.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, AgentsComponent, HeroSectionComponent, HeaderComponent, MapsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
