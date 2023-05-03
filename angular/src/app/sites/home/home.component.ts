import {
  Component,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { DetectifyService } from 'src/app/_services/detectify.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {}
