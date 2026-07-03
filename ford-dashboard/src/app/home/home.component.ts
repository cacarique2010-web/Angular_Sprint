import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  nome: string;

  constructor(private authService: AuthService, private router: Router) {
    this.nome = this.authService.getNome() || 'usuário';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
