import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string; // Adjust the type accordingly
  // Add other properties if there are more in your response
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://api-responsi2.test'; // Replace with the actual base API URL

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register.php`, { username, password });
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login.php`, { username, password }).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    // Check if there is a token stored in local storage
    return !!localStorage.getItem('token');
  }

  logout(): void {
    // Remove the token from local storage on logout
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth')

  }
}
