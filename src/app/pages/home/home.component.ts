import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CardModule,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  patchNotes = [
    { title: 'Patch 8.02 - Buff Cypher', description: 'Cypher riceve un buff importante...', link: 'https://playvalorant.com' },
    { title: 'Patch 8.01 - Nerf Jett', description: 'Jett ha meno dash...', link: 'https://playvalorant.com' }
  ];
}
