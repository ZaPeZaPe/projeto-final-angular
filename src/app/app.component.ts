import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // public obs = new Observable((observer) => {
  //   // console.log('Início');

  //   observer.next('1');

  //   setTimeout(() => {
  //     observer.next('2');
  //   }, 1000);

  //   setTimeout(() => {
  //     observer.next('3');
  //   }, 4000);

  //   setTimeout(() => {
  //     observer.next('4');
  //   }, 2000);

  //   observer.next('5');

  //   // observer.error('ERROR');
  //   // observer.complete();
  // });

  // public obs2 = of({
  //   name: 'ivirson',
  // });

  ngOnInit(): void {
    localStorage.setItem('USER_ROLES', JSON.stringify(['ADMIN']));
    // this.obs.subscribe({
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
    // this.obs2.subscribe({
    //   next(value) {
    //     console.log(value);
    //   },
    // });
  }
}
