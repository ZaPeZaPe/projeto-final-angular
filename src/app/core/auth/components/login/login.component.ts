import { LoginCredentials } from 'src/app/core/auth/models/login-credentials.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { UserToken } from '../../models/user-token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  public login(): void {
    const payload: LoginCredentials = this.loginForm.getRawValue();
    this.loginService
      .login(payload)
      .pipe(first())
      .subscribe({
        next: (res: UserToken) => {
          console.log(res)
          localStorage.setItem('TOKEN', res.token);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.router.navigate(['/users']);
        },
      });
  }
}
