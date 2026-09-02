import { inject, Service } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

const Icons = {
  profile: 'profile',
  arrowRight: 'arrow-right',
  arrowLeft: 'arrow-left',
  catalog: 'catalog',
  heart: 'heart',
  search: 'search',
  sliderItem: 'slider-item',
  info: 'info',
  dollar: 'dollar',
  tenge: 'tenge',
  rub: 'rub',
  down: 'down',
  navArrowRight: 'nav-arrow-right',
};

@Service()
export class Icon {
  private readonly matIconRegistry = inject(MatIconRegistry);
  private readonly domSanitizer = inject(DomSanitizer);

  public registerIcons(): void {
    this.loadIcons(Object.values(Icons), '../assets/icons');
  }

  private loadIcons(iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach((key) => {
      this.matIconRegistry.addSvgIcon(
        key,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `${iconUrl}/${key}.svg`,
        ),
      );
    });
  }
}
