import { Component, inject } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NavPopup } from './service/nav-popup';

@Component({
  selector: 'app-nav',
  imports: [MatFabButton, MatIcon],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
  providers: [NavPopup],
})
export class Nav {
  private readonly navPopup = inject(NavPopup);

  protected openNavPopup() {
    this.navPopup.open();
  }
}
