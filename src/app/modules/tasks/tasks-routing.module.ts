import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { rolesGuard } from 'src/app/core/guards/roles.guard';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';

const routes: Routes = [
  {
    path: '',
    component: ListTasksComponent,
    canActivate: [authGuard, rolesGuard],
    data: { roles: ['VIEWER', 'ADMIN'] },
  },
  {
    path: 'create',
    component: CreateTaskComponent,
  },
  {
    path: 'edit/:id',
    component: CreateTaskComponent,
    canActivate: [authGuard, rolesGuard],
    data: { roles: ['ADMIN'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
