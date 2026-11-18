import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';


interface User {
  name: string;
  tag: string;
  region: string;
  token: string;
  isLocalAdmin?: boolean; // Estensione dell'interfaccia originale per supportare il bypass
}

@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('vlr_user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // Modifichiamo il login per accettare i dati che arrivano dall'API di Henrik
  loginWithValorant(playerData: any): void {
    const user: User = {
      name: playerData.data.name,
      tag: playerData.data.tag,
      region: 'eu', // default per ora
      token: 'fake-jwt-token'
    };

    localStorage.setItem('vlr_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  /**
   * Metodo di bypass dedicato per il testing in ambiente locale.
   * Evita di effettuare chiamate HTTP verso API esterne quando scadute o bloccate da CORS.
   */
  loginAsLocalAdmin(name: string, tag: string): void {
    const user: User = {
      name: name,
      tag: tag,
      region: 'eu',
      token: 'fake-jwt-token',
      isLocalAdmin: true
    };

    localStorage.setItem('vlr_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('vlr_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/Home']);
  }

  // isLoggedIn(): boolean {
  //   return !!this.currentUserSubject.value;
  // }

  isLoggedIn(): boolean {
    // Controlla se il valore attuale del BehaviorSubject non è null
    return this.currentUserSubject.value !== null;
  }
}