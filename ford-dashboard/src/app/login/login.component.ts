import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  senha = '';
  rememberMe = false;
  showPassword = false;
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.email || !this.senha) {
      this.errorMessage = 'Informe e-mail e senha.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.senha).subscribe(success => {
      this.loading = false;
      if (success) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'E-mail ou senha inválidos.';
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
