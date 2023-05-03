import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarBaseComponent } from '../shared/snack-bars/base/snack-bar-base.component';
import { NotificationType } from '../_enums/notification.enum';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  duration: number = 5000;

  constructor(private readonly _snackBar: MatSnackBar) {}

  success(label: string, confirmation: boolean = false): void {
    this._snackBar.openFromComponent(SnackBarBaseComponent, {
      duration: this.duration,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['notification', 'notification-success'],
      data: { message: label, type: NotificationType.Success },
    });
  }

  error(label: string, confirmation: boolean = false): void {
    this._snackBar.openFromComponent(SnackBarBaseComponent, {
      duration: this.duration,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['notification', 'notification-error'],
      data: { message: label, type: NotificationType.Error },
    });
  }
}
