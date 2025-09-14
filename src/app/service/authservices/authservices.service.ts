import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';


interface User {
  email: string,
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) this.currentUserSubject.next(JSON.parse(storedUser));
  }

  login(email: string, password: string): Observable<User> {
    // qui potresti collegarti al Mockoon o simulare
    return of({ email, token: 'fake-jwt-token' }).pipe(
      delay(1000),
      map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
