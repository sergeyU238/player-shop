import { Component, inject } from '@angular/core';
import { Nav } from '../../features/nav/nav';
import { HeaderSearch } from '../../features/header-search/header-search';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthStore } from '../../shared/auth';
import { LoginPopup } from '../../features/login/services/login-popup';

@Component({
  selector: 'app-header',
  imports: [Nav, HeaderSearch, MatIcon, MatFabButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  providers: [LoginPopup],
})
export class Header {
  private readonly loginPopup = inject(LoginPopup);
  protected readonly user = inject(AuthStore).user;

  openLoginPopup() {
    if (!this.user()) {
      this.loginPopup.open();
    }
  }
}
