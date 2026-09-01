import { Component, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-buy-vendor-token-login-input',
  imports: [MatIcon, MatTooltip],
  templateUrl: './buy-vendor-token-login-input.html',
  styleUrl: './buy-vendor-token-login-input.scss',
})
export class BuyVendorTokenLoginInput implements FormValueControl<string> {
  value = model('');

  protected valueChange(event: InputEvent) {
    this.value.set((event?.target as HTMLInputElement).value || '');
  }
}
