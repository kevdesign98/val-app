import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Maps } from '../../../models/maps';
import { DUMMY_MAPS } from '../../../dummy-maps';

@Component({
  selector: 'app-list-maps',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './list-maps.component.html',
  styleUrl: './list-maps.component.css'
})
export class ListMapsComponent {
  maps: Maps[] = DUMMY_MAPS;

}
