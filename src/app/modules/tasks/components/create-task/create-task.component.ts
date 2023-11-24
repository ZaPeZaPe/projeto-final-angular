import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  first,
  takeUntil,
} from 'rxjs';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  private taskId?: string;
  public taskForm!: FormGroup;

  public obs = new Observable((observer) => {
    let counter = 0;
    window.setInterval(() => {
      observer.next(counter);
      counter++;
    }, 2000);
  });
userForm: any;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getIdFromUrl();
    // this.setFormData();
    // this.setZipCodeSubscription();
    // this.obs.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
    //   next(value) {
    //     console.log(value);
    //   },
    //   error(err) {
    //     console.log(err);
    //   },
    //   complete() {
    //     console.log('COMPLETE');
    //   },
    // });

    // this.taskForm.valueChanges
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe((_) => console.log(this.taskForm));
  }

  public getIdFromUrl(): void {
    this.taskId = this.route.snapshot.params['id'];
    if (this.taskId) {
      this.getTaskById();
    }
  }

  private buildForm(): void {
    this.taskForm = new FormGroup({
      id: new FormControl(),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(),
      dueDate: new FormControl(null, [Validators.required]),
      // documentNumber: new FormControl(null, [
      //   Validators.required,
      //   this.cpfValidator,
      // ]),
      // email: new FormControl(null, [
      //   Validators.required,
      //   Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      // ]),
      // password: new FormControl(null, [Validators.required]),
      // phone: new FormControl(null, [Validators.required]),
      category: new FormControl(),
      // address: new FormGroup({
      //   zipCode: new FormControl(),
      //   street: new FormControl(),
      //   number: new FormControl(null, [Validators.required]),
      //   complement: new FormControl(),
      //   neighborhood: new FormControl(),
      //   city: new FormControl(),
      //   state: new FormControl(),
      // }),
    });
  }

  private getTaskById(): void {
    this.tasksService
      .getById(this.taskId!)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.taskForm.patchValue(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // private setFormData(): void {
  //   const newTask: Task = {
  //     name: 'Clovis',
  //     profession: 'Dev',
  //     birthDate: '01/01/2000',
  //     documentNumber: '01234567890',
  //     email: 'clovis@email.com',
  //     password: 'SenhaForte@123',
  //     phone: '11989898989',
  //     income: 1000,
  //     address: {
  //       zipCode: '42800040',
  //       street: 'Rua da Rodoviária',
  //       number: 200,
  //       neighborhood: 'Centro',
  //       city: 'Camaçari',
  //       state: 'BA',
  //     },
  //   };

  //   this.taskForm.patchValue(newTask);
  // }

  public onSave(): void {
    if (this.taskId) {
      this.onUpdate();
    } else {
      this.onCreate();
    }
  }

  public onCreate(): void {
    this.tasksService
      .createTask(this.taskForm.getRawValue())
      .pipe(first())
      .subscribe({
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.router.navigate(['/tasks']);
        },
      });
  }

  public onUpdate(): void {
    this.tasksService
      .edit(this.taskForm.getRawValue())
      .pipe(first())
      .subscribe({
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.router.navigate(['/tasks']);
        },
      });
  }

  // private cpfValidator({ value }: AbstractControl<string>) {
  //   if (!value) return { emptyDocument: true };

  //   // Elimina CPFs invalidos conhecidos
  //   if (
  //     value.length != 11 ||
  //     value == '00000000000' ||
  //     value == '11111111111' ||
  //     value == '22222222222' ||
  //     value == '33333333333' ||
  //     value == '44444444444' ||
  //     value == '55555555555' ||
  //     value == '66666666666' ||
  //     value == '77777777777' ||
  //     value == '88888888888' ||
  //     value == '99999999999'
  //   ) {
  //     return { invalidDocument: true };
  //   }

  //   // Valida 1o digito
  //   let add = 0;
  //   for (let i = 0; i < 9; i++) {
  //     add += parseInt(value.charAt(i)) * (10 - i);
  //   }

  //   let rev = 11 - (add % 11);
  //   if (rev == 10 || rev == 11) rev = 0;
  //   if (rev != parseInt(value.charAt(9))) return { invalidDocument: true };

  //   // Valida 2o digito
  //   add = 0;
  //   for (let i = 0; i < 10; i++) {
  //     add += parseInt(value.charAt(i)) * (11 - i);
  //   }

  //   rev = 11 - (add % 11);
  //   if (rev == 10 || rev == 11) rev = 0;
  //   if (rev != parseInt(value.charAt(10))) return { invalidDocument: true };

  //   return null;
  // }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
