import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DetectifiedProcessed } from 'src/app/_models/detectified';
import { DetectifyService } from 'src/app/_services/detectify.service';

@Component({
  selector: 'app-detectified',
  templateUrl: './detectified.component.html',
  styleUrls: ['./detectified.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DetectifiedComponent implements OnInit, OnDestroy {
  detectified: DetectifiedProcessed;
  notFound: boolean = false;
  predictions: boolean = true;
  displayedColumns: string[] = ['label', 'quantity'];
  private paramMapSubscription$: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly detectifyService: DetectifyService
  ) {}

  ngOnInit(): void {
    this.paramMapSubscription$ = this.route.paramMap.subscribe((params) => {
      this.checkUuidAndInit(params.get('uuid'));
    });
  }

  ngOnDestroy(): void {
    if (this.paramMapSubscription$) this.paramMapSubscription$.unsubscribe();
  }

  private checkUuidAndInit(uuid: string | null): void {
    if (!uuid) {
      this.notFound = true;
      return;
    }
    this.saveDetectified(uuid);
  }

  private saveDetectified(uuid: string): void {
    this.getDetectified(uuid).subscribe({
      next: (detectified) => (this.detectified = detectified),
      error: (err) => {
        this.notFound = true;
      },
      complete: () => (this.notFound = false),
    });
  }

  private getDetectified(uuid: string): Observable<DetectifiedProcessed> {
    return this.detectifyService.detectified(uuid);
  }

  public openImage(imgUrl: string): void {
    window.open(imgUrl, '_blank');
  }

  public handlePredictionsToggle(event: MatSlideToggleChange): void {
    this.predictions = event.checked;
  }
}
