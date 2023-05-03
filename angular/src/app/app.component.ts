import { Component } from '@angular/core';
import { LoadingService } from './_services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(private readonly loadingService: LoadingService) {}

  get loading(): boolean {
    return this.loadingService.isLoading;
  }
}
