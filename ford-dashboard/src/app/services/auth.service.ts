import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:3001';
  private readonly storageKey = 'ford_logged_in';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<boolean> {
    return this.http
      .post<{ usuario: Usuario }>(`${this.apiUrl}/login`, { email, senha })
      .pipe(
        map(res => {
          if (res && res.usuario) {
            localStorage.setItem(this.storageKey, 'true');
            localStorage.setItem('ford_nome', res.usuario.nome);
            return true;
          }
          return false;
        }),
        catchError(() => of(false))
      );
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('ford_nome');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }

  getNome(): string {
    return localStorage.getItem('ford_nome') ?? '';
  }
}
