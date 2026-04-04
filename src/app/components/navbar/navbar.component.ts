import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthservicesService } from '../../service/authservices/authservices.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isOpen = false;

  // Logica PWA
  deferredPrompt: any;
  showInstallBtn = true;

  constructor(public auth: AuthservicesService) { }

  // FIX 1: Usiamo direttamente il nome dell'evento senza passare $event se non ci serve nel metodo
  // Per beforeinstallprompt ci serve 'e' per fare preventDefault()
  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(e: any) {
    console.log('✅ EVENTO PWA INTERCETTATO!'); // <-- La scritta che cerchi

    // 1. Impedisce al browser di mostrare il suo popup grigio brutto
    e.preventDefault();

    // 2. Salva l'evento nella variabile per usarlo dopo quando clicchi il tuo bottone
    this.deferredPrompt = e;

    // 3. Fa apparire il tuo bottone viola nella Navbar
    this.showInstallBtn = true;
  }

  installPWA() {
    if (this.deferredPrompt) {
      // 1. Mostra il popup di sistema
      this.deferredPrompt.prompt();

      // 2. Aspetta la risposta dell'utente
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('L’utente ha accettato l’installazione');
        } else {
          console.log('L’utente ha rifiutato l’installazione');
        }
        // 3. Pulisci la variabile (fondamentale, l'evento si può usare una volta sola)
        this.deferredPrompt = null;
        this.showInstallBtn = false;
      });
    } else {
      console.error("Il prompt non è ancora disponibile!");
    }
  }

  // FIX 2: Qui rimetto il decoratore ma SENZA ['$event'], 
  // dato che il metodo non riceve argomenti. Così è perfetto.
  @HostListener('window:appinstalled')
  onAppInstalled() {
    console.log('ValApp installata correttamente!');
    this.showInstallBtn = false;
  }

  logout() {
    this.auth.logout();
  }
}