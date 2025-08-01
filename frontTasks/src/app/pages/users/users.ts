import { Component, OnInit } from '@angular/core';
import { UsersServices } from '../../services/users';
import { NgIf, NgFor, NgClass, } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  styleUrls: ['./users.css'] ,
    standalone: true,
  imports: [NgIf, NgFor, FormsModule]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  error = '';
creatingUser = false;

newUser = {
  Name: '',
  Email: '',
  Phone: '',
  Password: ''
};


  constructor(private userService: UsersServices, private router: Router) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data.data || [],
      error: (err) => {
        this.error = 'Error al cargar usuarios';
        console.error(err);
      }
    });
  }

openCreateUserForm() {
  this.creatingUser = true;
  this.newUser = {
     Name: '',
  Email: '',
  Phone: '',
  Password: ''
  };
}

cancelCreateUser() {
  this.creatingUser = false;
}

submitCreateUser() {
  this.userService.createUser(this.newUser).subscribe({
    next: () => {
      this.creatingUser = false;
      this.ngOnInit(); // recarga la lista
    },
    error: (err) => {
      console.error('Error al crear usuario', err);
    }
  });
}

goToTasks() {
  this.router.navigate(['/tasks']);
}
}