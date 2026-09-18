import { Component, inject, signal } from '@angular/core';
import {
  email,
  form,
  FormField,
  minLength,
  required,
} from '@angular/forms/signals';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { type AuthLoginDto, AuthStore } from '../../shared/auth';

@Component({
  selector: 'app-login',
  imports: [MatFormField, MatInput, MatError, MatLabel, FormField, MatButton],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authStore = inject(AuthStore);
  private readonly loginModel = signal<AuthLoginDto>({
    email: '',
    password: '',
  });

  protected readonly user = this.authStore.user;
  protected readonly loginForm = form(this.loginModel, (schema) => {
    required(schema.email);
    email(schema.email, { message: 'Не верный электронный адрес' });

    required(schema.password);
    minLength(schema.password, 6, { message: 'Пароль слишком короткий' });
  });

  onSubmit() {
    if (this.loginForm().valid()) {
      this.authStore.login(this.loginModel());
    }
  }
}
