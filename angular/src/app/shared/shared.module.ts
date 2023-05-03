import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SnackBarBaseComponent } from './snack-bars/base/snack-bar-base.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CommonModule } from '@angular/common';
import { DropSelectionComponent } from './drop-selection/drop-selection.component';
import { LoadingComponent } from './loading/loading.component';

const components = [
  SnackBarBaseComponent,
  DropSelectionComponent,
  LoadingComponent,
];

@NgModule({
  declarations: components,
  imports: [MatIconModule, NgxFileDropModule, CommonModule],
  exports: components,
})
export class SharedModule {}
