import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { form, FormField } from '@angular/forms/signals';

interface SearchForm {
  value: string;
}

@Component({
  selector: 'app-header-search',
  imports: [MatIcon, MatInput, MatIconButton, FormField],
  templateUrl: './header-search.html',
  styleUrl: './header-search.scss',
})
export class HeaderSearch {
  private readonly formData = signal<SearchForm>({
    value: '',
  });

  protected readonly favorite = signal(false);
  protected readonly form = form(this.formData);

  protected onSearch(event: SubmitEvent) {
    console.log('Header Search event: ', event);
  }

  protected toggleFavorite() {
    this.favorite.update((value) => !value);
  }
}
