import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  correo = '';
  contra = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.authService.login({ Correo: this.correo, Contra: this.contra }).subscribe({
      next: (res) => {
        console.log('Login exitoso', res);
        this.router.navigate(['/']); // Ajusta a la ruta protegida
      },
      error: (err) => {
        console.error('Error login', err);
        this.error = 'Credenciales incorrectas o error de servidor';
      },
    });
  }
}
