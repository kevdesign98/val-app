import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CardModule, NavbarComponent, RouterLink, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
