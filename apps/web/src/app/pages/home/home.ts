import { Component } from '@angular/core';
import { Header } from '../../widgets/header/header';
import { Slider, Slide } from '../../features/slider';
import { BuyTokens } from '../../widgets/buy-tokens/buy-tokens';

@Component({
  selector: 'app-home',
  imports: [Header, Slider, Slide, BuyTokens],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
