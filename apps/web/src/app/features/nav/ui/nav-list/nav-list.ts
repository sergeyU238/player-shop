import { Component, inject } from '@angular/core';
import { NavItems } from '../../service/nav-items.service';
import { NavListGroup } from '../nav-list-group/nav-list-group';
import type { NavItem } from '../../model/nav.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-nav-list',
  imports: [NavListGroup, MatIcon],
  templateUrl: './nav-list.html',
  styleUrl: './nav-list.scss',
  providers: [NavItems],
})
export class NavList {
  private readonly navItems = inject(NavItems);
  protected readonly nav = this.navItems.nav;
  protected readonly activeNav = this.navItems.activeNav;

  public changeActiveNav(item: NavItem) {
    this.navItems.setActive(item);
  }

  protected setActiveNav(item: NavItem) {
    this.activeNav.set(item);
  }
}
