import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';


interface User {
  name: string;
  tag: string;
  region: string;
  token: string;
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

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // isLoggedIn(): boolean {
  //   return !!this.currentUserSubject.value;
  // }

  isLoggedIn(): boolean {
    // Controlla se il valore attuale del BehaviorSubject non è null
    return this.currentUserSubject.value !== null;
  }
}
