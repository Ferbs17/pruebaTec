import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth'; // verifica que la ruta sea correcta
import { NgIf } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './app.html', 
  standalone: true,
  styleUrls: ['./app.css'],
    imports: [FormsModule, NgIf],  
})
export class Login  {
  correo = '';
  contra = '';
  error = '';
 mostrarContra = false;
  constructor(private authService: AuthService, private router: Router) {
      console.log('Login cargado');
  }
    toggleMostrarContra() {
    this.mostrarContra = !this.mostrarContra;
  }

onSubmit() {
  this.error = '';

  this.authService.login({ Correo: this.correo, Contra: this.contra }).subscribe({
    next: (res) => {
      const token = res.data.token;
      const userId = res.data.ID;
      const userName = res.data.Nombre;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId.toString()); // opcional
      localStorage.setItem('userName', userName);        // opcional

      this.router.navigate(['/tasks']); // ruta protegida
    },
    error: (err) => {
      this.error = 'Credenciales incorrectas o error en el servidor';
      console.error(err);
    }
  });
  }
}
