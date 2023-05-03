import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public isLoading: boolean = false;

  public enableLoading() {
    this.isLoading = true;
  }

  public disableLoading() {
    this.isLoading = false;
  }
}
