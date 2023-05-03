import { Injectable } from '@angular/core';
import {
  Detectified,
  DetectifiedProcessed,
  DetectifyResponse,
} from '../_models/detectified';
import { Observable, forkJoin, map, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiImagesUrl, apiUrl } from 'src/settings/api';

@Injectable({
  providedIn: 'root',
})
export class DetectifyService {
  private api = apiUrl;
  private apiOriginalImg = apiImagesUrl + 'original/';
  private apiPredictedImg = apiImagesUrl + 'predicted/';

  constructor(private readonly http: HttpClient) {}

  public detectify(image: File): Observable<DetectifyResponse> {
    const data = new FormData();
    data.append('file', image);

    return this.http.post<DetectifyResponse>(this.api + '/detectify', data);
  }

  private getOriginalImage(uuid: string): Observable<Blob> {
    return this.http.get<Blob>(this.apiOriginalImg + uuid, {
      responseType: 'blob' as 'json',
    });
  }

  private getPredictedImage(uuid: string): Observable<Blob> {
    return this.http.get<Blob>(this.apiPredictedImg + uuid, {
      responseType: 'blob' as 'json',
    });
  }

  public detectified(uuid: string): Observable<DetectifiedProcessed> {
    return this.http
      .get<Detectified>(this.api + '/detectified/' + uuid)
      .pipe(switchMap((detectified) => this.processDetectified(detectified)));
  }

  private processDetectified(
    detectified: Detectified
  ): Observable<DetectifiedProcessed> {
    const originalImage$ = this.getOriginalImage(detectified.uuid).pipe(
      map((image) => URL.createObjectURL(image))
    );

    const predictedImage$ = this.getPredictedImage(detectified.uuid).pipe(
      map((image) => URL.createObjectURL(image))
    );

    return forkJoin([originalImage$, predictedImage$]).pipe(
      map(([originalImage, predictedImage]) => ({
        ...detectified,
        objects: Object.keys(detectified.counts),
        image: {
          original: originalImage,
          predicted: predictedImage,
        },
      }))
    );
  }
}
