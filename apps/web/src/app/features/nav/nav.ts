import { Component } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-nav',
  imports: [MatFabButton, MatIcon],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {}
