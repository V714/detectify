import { Component, Inject, ViewEncapsulation } from "@angular/core";
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from "@angular/material/snack-bar";
import { NotificationType } from "src/app/_enums/notification.enum";
import { SnackBarData } from "src/app/_models/snack-bar-data.model";

@Component({
  templateUrl: "./snack-bar-base.component.html",
  styleUrls: ["./snack-bar-base.component.sass"],
  encapsulation: ViewEncapsulation.None,
  
})
export class SnackBarBaseComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) private readonly data: SnackBarData,
    private readonly snackBarRef: MatSnackBarRef<SnackBarBaseComponent>
  ) {}

  close() {
    this.snackBarRef.dismiss();
  }

  get icon(): NotificationType {
    return this.data.type;
  }

  get message(): string {
    return this.data.message;
  }
}
