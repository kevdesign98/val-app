import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list-maps',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './list-maps.component.html',
  styleUrl: './list-maps.component.css'
})
export class ListMapsComponent {
}
