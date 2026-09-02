import { computed, Injectable, linkedSignal, signal } from '@angular/core';
import { Nav, type NavItem, type NavItemDto } from '../model/nav.model';

@Injectable()
export class NavItems {
  private readonly apiData = signal(navItemData);
  public readonly nav = computed(() => new Nav(this.apiData()));
  public readonly activeNav = linkedSignal<NavItem | null>(
    () => this.nav().getLevel()['0'] ?? null,
  );

  public setActive(item: NavItem) {
    this.activeNav.set(item);
  }
}

const navItemData: Array<NavItemDto> = [
  { name: 'Игры и игровые сервисы', id: 1, parent: null, url: 'games' },
  { name: 'Игровые ценности', id: 2, parent: null, url: 'game-items' },
  { name: 'Мобильные игры', id: 3, parent: null, url: 'mobile-games' },
  {
    name: 'Сервисы и соцсети',
    id: 4,
    parent: null,
    url: 'services-and-social',
  },
  { name: 'Программы', id: 5, parent: null, url: 'software' },

  { name: 'Steam', id: 6, parent: 1, url: 'steam' },
  { name: 'Игры и DLC', id: 7, parent: 6, url: 'games-and-dlc' },
  { name: 'Пополнение баланса', id: 8, parent: 6, url: 'balance-top-up' },
  { name: 'Подарочные карты', id: 9, parent: 6, url: 'gift-cards' },
  { name: 'Коллекционные карточки', id: 10, parent: 6, url: 'trading-cards' },
  { name: 'Смена региона', id: 11, parent: 6, url: 'region-change' },

  { name: 'PlayStation', id: 12, parent: 1, url: 'playstation' },
  { name: 'Игры и DLC', id: 13, parent: 12, url: 'games-and-dlc' },
  { name: 'Пополнение баланса', id: 14, parent: 12, url: 'balance-top-up' },
  { name: 'Новые аккаунты', id: 15, parent: 12, url: 'new-accounts' },
  { name: 'PS Plus', id: 16, parent: 12, url: 'ps-plus' },
  { name: 'EA Play', id: 17, parent: 12, url: 'ea-play' },

  { name: 'Xbox', id: 18, parent: 1, url: 'xbox' },
  { name: 'Игры и DLC', id: 19, parent: 18, url: 'games-and-dlc' },
  { name: 'Пополнение баланса', id: 20, parent: 18, url: 'balance-top-up' },
  { name: 'Новые аккаунты', id: 21, parent: 18, url: 'new-accounts' },
  { name: 'Xbox Game Pass', id: 22, parent: 18, url: 'game-pass' },
  { name: 'Услуги', id: 23, parent: 18, url: 'services' },

  { name: 'Nintendo', id: 24, parent: 1, url: 'nintendo' },
  { name: 'Игры и DLC', id: 25, parent: 24, url: 'games-and-dlc' },
  { name: 'Подарочные карты', id: 26, parent: 24, url: 'gift-cards' },
  { name: 'Новые аккаунты', id: 27, parent: 24, url: 'new-accounts' },
  { name: 'NS Online', id: 28, parent: 24, url: 'ns-online' },

  { name: 'Battle.net', id: 29, parent: 1, url: 'battle-net' },
  { name: 'World of Warcraft', id: 30, parent: 29, url: 'world-of-warcraft' },
  { name: 'Подарочные карты', id: 31, parent: 29, url: 'gift-cards' },
  { name: 'Прямое пополнение', id: 32, parent: 29, url: 'direct-top-up' },
  { name: 'Новые аккаунты', id: 33, parent: 29, url: 'new-accounts' },
  { name: 'Смена региона', id: 34, parent: 29, url: 'region-change' },

  { name: 'Подборки', id: 35, parent: 1, url: 'collections' },
  { name: 'Скидки 90%', id: 36, parent: 35, url: '90-percent-discounts' },
  {
    name: 'Популярные издатели',
    id: 37,
    parent: 35,
    url: 'popular-publishers',
  },
  { name: 'Лучшие серии игр', id: 38, parent: 35, url: 'best-game-series' },
  { name: 'Steam Deck', id: 39, parent: 35, url: 'steam-deck' },
  { name: 'Bundle-наборы', id: 40, parent: 35, url: 'bundle-packs' },
];
