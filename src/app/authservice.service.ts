import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:5000';

  constructor(private http: HttpClient,private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post<any>(`${this.BASE_URL}/login`, payload);
  }

  signup(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post<any>(`${this.BASE_URL}/signup`, payload);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
  redirectAfterLogin(): void {
    const pending = localStorage.getItem('pendingSearch');

    if (pending) {
      const { from, to, date } = JSON.parse(pending);
      localStorage.removeItem('pendingSearch');

      this.router.navigate(['/results'], {
        queryParams: { from, to, date }
      });
    } else {
      this.router.navigate(['/dashboard']); // Or any default page
    }
  }

}
