import {
  Component,
  contentChildren,
  effect,
  type OnDestroy,
  signal,
} from '@angular/core';
import { Slide } from './ui/slide/slide';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-slider',
  imports: [MatButton, MatIcon],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
})
export class Slider implements OnDestroy {
  private intervalId = setInterval(() => {
    this.next();
  }, 5000); // 5 seconds

  protected readonly slides = contentChildren(Slide);
  protected readonly activeSlide = signal(0);

  constructor() {
    effect(() => {
      const active = this.activeSlide();

      this.slides().forEach((slide, index) => {
        slide.active.set(index === active);
      });
    });
  }

  public ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  protected next(): void {
    const isLastSlide = this.activeSlide() === this.slides().length - 1;

    this.activeSlide.update((index) => (isLastSlide ? 0 : index + 1));
  }

  protected prev(): void {
    this.activeSlide.update((index) => Math.max(index - 1, 0));
  }

  protected setActiveSlide(index: number) {
    this.activeSlide.set(index);
  }
}
