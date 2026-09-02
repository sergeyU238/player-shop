import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { NavList } from '../ui/nav-list/nav-list';
import { Subscription } from 'rxjs';

@Injectable()
export class NavPopup {
  private overlay = inject(Overlay);
  private overlayRef?: OverlayRef;
  private subscription?: Subscription;

  open() {
    if (this.overlayRef) {
      return;
    }

    const positionStrategy = this.overlay
      .position()
      .global()
      .top('76px')
      .left('0')
      .right('0')
      .centerHorizontally();

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'menu-backdrop',
      panelClass: 'menu-panel',
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });

    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });

    this.overlayRef.attach(new ComponentPortal(NavList));
    this.subscription = this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });
  }

  close() {
    if (this.overlayRef) {
      this.subscription?.unsubscribe();
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
  }

  toggle() {
    if (this.overlayRef) {
      this.close();
    } else {
      this.open();
    }
  }
}
