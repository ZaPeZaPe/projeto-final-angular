import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  public tasks: Task[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.getTasks();
  }

  public getTasks(): void {
    this.tasksService
      .getTasks()
      .pipe(first())
      .subscribe({
        next: (res: Task[]) => {
          this.tasks = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // public editTask(id: string): void {

  // }

  public deleteTask(id: string): void {}
}
