import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopupWrapper } from '../components/login-popup-wrapper';

@Injectable()
export class LoginPopup {
  private readonly dialog = inject(MatDialog);

  open() {
    return this.dialog.open(LoginPopupWrapper, {
      width: '400px',
      maxWidth: '95vw',
      minWidth: '400px',
      minHeight: '340px',
      autoFocus: 'email',
      restoreFocus: true,
      disableClose: false,
    });
  }
}
