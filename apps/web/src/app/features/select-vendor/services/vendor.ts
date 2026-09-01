import { Injectable, signal } from '@angular/core';
import type { VendorModel } from '../../../entities/vendor';

@Injectable()
export class Vendor {
  public getVendors() {
    return signal<Array<VendorModel>>(VENDORS);
  }
}

const VENDORS: Array<VendorModel> = [
  {
    id: '1',
    name: 'Steam',
    logo: 'steam.svg',
  },
  {
    id: '2',
    name: 'Telegram',
    logo: 'telegram.svg',
  },
  {
    id: '3',
    name: 'Roblox',
    logo: 'roblox.svg',
  },
  {
    id: '4',
    name: 'Brawl Stars',
    logo: 'brawl-stars.svg',
  },
  {
    id: '5',
    name: 'PUBG Mobile',
    logo: 'pubg-mob.svg',
  },
  {
    id: '6',
    name: 'App Store',
    logo: 'app-store.svg',
  },
  {
    id: '7',
    name: 'ChartGPT',
    logo: 'chart-gpt.svg',
  },
  {
    id: '8',
    name: 'Play Station',
    logo: 'play-station.svg',
  },
  {
    id: '9',
    name: 'Tick Tock',
    logo: 'tick-tock.svg',
  },
  {
    id: '9',
    name: 'Mobile Legends',
    logo: 'mobile-leg.svg',
  },
];
