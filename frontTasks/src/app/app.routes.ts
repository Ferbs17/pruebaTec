import { Routes } from '@angular/router';
import { Login } from './app-login';        
import { Task } from './pages/task/task';
import { authGuard } from './auth-guard'; 
import { UsersComponent } from './pages/users/users';
export const routes: Routes = [
  { path: '', component: Login  },           // ruta raíz muestra login
  { path: 'tasks', component: Task, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }           // fallback
];
