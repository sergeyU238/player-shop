import { Component } from '@angular/core';
import { Login } from '../login';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-login-popup-wrapper',
  imports: [Login, MatMiniFabButton, MatIcon, MatDialogClose],
  templateUrl: './login-popup-wrapper.html',
  styleUrl: './login-popup-wrapper.scss',
})
export class LoginPopupWrapper {}
