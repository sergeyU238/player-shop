import { Component } from '@angular/core';
import { Nav } from '../../features/nav/nav';
import { HeaderSearch } from '../../features/header-search/header-search';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [Nav, HeaderSearch, MatIcon, MatFabButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
