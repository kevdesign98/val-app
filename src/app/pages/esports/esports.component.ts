import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-esports',
  standalone: true,
  imports: [SidebarComponent,CommonModule],
  templateUrl: './esports.component.html',
  styleUrl: './esports.component.css'
})
export class EsportsComponent {

}
