import { Component, inject } from '@angular/core';
import { Header } from '../../widgets/header/header';
import { Slider, Slide } from '../../features/slider';
import { BuyTokens } from '../../widgets/buy-tokens/buy-tokens';
import { Meta, Title } from '@angular/platform-browser';
import { DashboardProducts } from '../../widgets/dashboard-products/dashboard-products';

@Component({
  selector: 'app-home',
  imports: [Header, Slider, Slide, BuyTokens, DashboardProducts],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('Игры и игровые сервисы | Player Shop');

    this.meta.updateTag({
      name: 'description',
      content: 'Игры и игровые сервисы в Player Shop.',
    });
  }
}
