import { Component, model } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.html',
  styleUrl: './slide.scss',
  host: {
    '[class.active]': 'active()',
  },
})
export class Slide {
  public readonly active = model(false);
}
