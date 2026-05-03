import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
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


    this.statsService.getAccount(riotId, tagline).subscribe({

      next: (res) => {

        // 1. Salviamo la sessione nell'AuthService (usando il metodo che abbiamo creato)

        this.authService.loginWithValorant(res);


        // 2. Navighiamo alla dashboard

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