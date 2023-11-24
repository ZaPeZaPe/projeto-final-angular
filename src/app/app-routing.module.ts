import { rolesGuard } from './core/guards/roles.guard';
import { CreateTaskComponent } from './modules/tasks/components/create-task/create-task.component';
import { ListTasksComponent } from './modules/tasks/components/list-tasks/list-tasks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './modules/tasks/tasks.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./modules/tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
