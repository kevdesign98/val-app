import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
// import { AuthservicesService } from '../../service/authservices/authservices.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink,NavbarComponent,FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      riotId: ['', Validators.required],
      tagline: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { riotId, tagline } = this.loginForm.value;
    this.loading = true;

    this.http.get(`https://api.henrikdev.xyz/valorant/v1/account/${riotId}/${tagline}`)
      .subscribe({
        next: (data) => {
          this.loading = false;
          // 👇 passiamo i dati al dashboard con state
          this.router.navigate(['/dashboard'], { state: { playerData: data } });
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Account non trovato. Riprova!';
        }
      });
  }
}
