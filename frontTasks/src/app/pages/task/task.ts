import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Router } from '@angular/router';
import { NgIf, NgFor, NgClass, } from '@angular/common';
@Component({
  selector: 'app-task',
  templateUrl: './task.html',
  styleUrls: ['./task.css'] ,
  imports: [NgIf, NgFor, NgClass, FormsModule]
})
export class Task implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  error = '';
  statusFilter = '';
  constructor(private taskService: TaskService, private router: Router) {}
  editMode = false;
  taskToEdit: any = null;
  creatingTask = false;

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = Array.isArray(data.data) ? data.data : [];
         this.applyFilter(); 
      },
      error: (err) => {
        this.error = 'Error al cargar tareas';
        console.error(err);
      },
    });
  }
    applyFilter() {
    if (this.statusFilter === '') {
      this.filteredTasks = this.tasks;
    } else {
      const filterValue = +this.statusFilter;
      this.filteredTasks = this.tasks.filter(task => task.Status === filterValue);
    }
  }

  openEditForm(task: any) {
  this.taskToEdit = { ...task }; // clonar para no editar directo el array
  this.editMode = true;
}


 saveEdit() {
  this.taskService.updateTask(this.taskToEdit).subscribe({
    next: () => {
      this.editMode = false;
      this.loadTasks(); // refrescar lista con cambios
    },
    error: (err) => {
      console.error('Error al actualizar', err);
    }
  });
}


deleteTask(id: number) {
  if (confirm('¿Estás seguro de eliminar esta tarea?')) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        console.log('Tarea eliminada');
        this.loadTasks(); // recarga la tabla
      },
      error: (err) => console.error('Error al eliminar', err)
    });
  }
}

newTask = {
  Title: '',
  Description: '',
  Status: 0
};

openCreateForm() {
  this.creatingTask = true;
  this.newTask = {
    Title: '',
    Description: '',
    Status: 0
  };
}

cancelCreate() {
  this.creatingTask = false;
}

submitCreate() {
  this.taskService.createTask(this.newTask).subscribe(() => {
     this.loadTasks();
    this.creatingTask = false;
  });
}

goToUsers() {
  this.router.navigate(['/users']);
}
}
