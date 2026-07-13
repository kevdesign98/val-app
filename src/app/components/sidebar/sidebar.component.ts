import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, DrawerModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  name: string = '';
  tag: string = '';
  showUserMenu: boolean = false;
  isMobileMenuOpen: boolean = false;


  constructor(private router: Router, private eRef: ElementRef) {

    const saved = localStorage.getItem('vlr_user');

    if (saved) {
      const json = JSON.parse(saved);
      this.name = json.name || json.username || '';
      this.tag = json.tag || json.tagline || '';
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) this.showUserMenu = false;
  }

  logout() { localStorage.removeItem('vlr_user'); this.router.navigate(['/Home']); }

}
