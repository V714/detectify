import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { DetectifiedComponent } from './detectified/detectified.component';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GetScoresPipe } from '../_pipes/get-scores/get-scores.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomeComponent, DetectifiedComponent, GetScoresPipe],
  imports: [
    CommonModule,
    MatTableModule,
    MatTooltipModule,
    MatSlideToggleModule,
    SharedModule,
  ],
  bootstrap: [HomeComponent, DetectifiedComponent],
})
export class SitesModule {}
