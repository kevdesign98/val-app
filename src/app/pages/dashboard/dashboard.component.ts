import { Component } from '@angular/core';
import { AuthservicesService } from '../../service/authservices/authservices.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private auth: AuthservicesService) { }
  logout(){
    this.auth.logout();
  }
}
