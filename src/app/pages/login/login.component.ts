import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthservicesService } from '../../service/authservices/authservices.service';
import { StatsService } from '../../service/stats-services/stats.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  showHelpModal = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthservicesService, // Iniettato correttamente
    private statsService: StatsService         // Iniettato correttamente
  ) {
    this.loginForm = this.fb.group({
      riotId: ['', Validators.required],
      tagline: ['', Validators.required]
    });
  }

  toggleHelpModal() {
    this.showHelpModal = !this.showHelpModal;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    // Estraiamo i valori dal form
    const { riotId, tagline } = this.loginForm.value;

    // 1. CONTROLLO DI BYPASS PER IL LOCALE
    if (riotId?.toLowerCase().trim() === 'lazarus' && tagline?.toLowerCase().trim() === 'bmth') {
      this.loading = false;
      // Eseguiamo il login bypass memorizzando il flag dell'admin locale ed effettuando il redirect
      this.authService.loginAsLocalAdmin('Lazarus', 'BMTH');
      return; // Blocca l'esecuzione ed evita di effettuare la richiesta HTTP sotto
    }

    // 2. FLUSSO REALE CON API
    this.statsService.getAccount(riotId, tagline).subscribe({
      next: (res) => {
        // Salviamo la sessione nell'AuthService (usando il metodo che abbiamo creato)
        this.authService.loginWithValorant(res);

        // Navighiamo alla dashboard
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error("Errore API Henrik:", err);
        this.loading = false;

        // Messaggio di errore dinamico basato sullo status dell'API
        if (err.status === 401) {
          this.errorMessage = "Chiave API non valida o scaduta.";
        } else if (err.status === 404) {
          this.errorMessage = "Account Riot non trovato. Controlla Nome e Tag.";
        } else {
          this.errorMessage = "Errore di sincronizzazione col server.";
        }
      }
    });
  }
}