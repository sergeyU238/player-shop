import { Component, computed, inject, input } from '@angular/core';
import { NavItems } from '../../service/nav-items.service';
import type { NavItem } from '../../model/nav.model';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-nav-list-group',
  imports: [RouterLink, MatIcon],
  templateUrl: './nav-list-group.html',
  styleUrl: './nav-list-group.scss',
})
export class NavListGroup {
  private readonly nav = inject(NavItems).nav;

  public readonly currentGroup = input.required<NavItem>();
  protected readonly subItems = computed(() =>
    this.nav().getLevel(this.currentGroup().id),
  );
}
