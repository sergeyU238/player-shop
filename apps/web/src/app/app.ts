import { Component, inject, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Icon } from './shared/services/icon';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly iconService = inject(Icon);

  public ngOnInit() {
    this.iconService.registerIcons();
  }
}
