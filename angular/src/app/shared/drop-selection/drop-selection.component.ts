import { Component, Input, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { DetectifyService } from 'src/app/_services/detectify.service';
import { LoadingService } from 'src/app/_services/loading.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'drop-selection',
  templateUrl: './drop-selection.component.html',
  styleUrls: ['./drop-selection.component.sass'],
})
export class DropSelectionComponent {
  @ViewChild('fileDrop') fileDrop!: NgxFileDropEntry;
  @Input() dropZoneLabel: string = 'Upload your photo!';
  @Input() small: boolean = false;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly renderer: Renderer2,
    private readonly detectifyService: DetectifyService,
    private readonly router: Router,
    private readonly loadingService: LoadingService
  ) {}

  private processFile(file: File): void {
    this.loadingService.enableLoading();
    this.detectifyService.detectify(file).subscribe({
      next: ({ uuid }) => this.router.navigate(['detectified', uuid]),
      error: (err) => {
        this.loadingService.disableLoading();
        if (err.status === 0 || typeof err.error !== 'string') {
          this.notificationService.error(
            'Unknown server error, please contact the administrator.'
          );
          return;
        }
        this.notificationService.error(err.error);
      },
      complete: () => this.loadingService.disableLoading(),
    });
  }

  private isImageFile(filename: string): boolean {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
    const isImage = allowedExtensions.test(filename);
    if (!isImage)
      this.notificationService.error(
        'Wrong file! Supported extensions: .jpeg| .jpg| .png| .webp'
      );
    return isImage;
  }

  public onFileDropped(files: NgxFileDropEntry[]): void {
    if (
      files[0].fileEntry.isFile &&
      this.isImageFile(files[0].fileEntry.name)
    ) {
      const fileEntry = files[0].fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        this.processFile(file);
      });
    }
  }

  public onFileSelected(e: Event): void {
    const target = e.target as HTMLInputElement;
    const files: FileList | null = target.files;
    if (!files) return;
    if (files.length > 1) {
      this.notificationService.error('You can choose only one file!');
      return;
    }

    if (this.isImageFile(files.item(0)!.name)) {
      this.processFile(files.item(0)!);
    }
  }

  public onFileEnter(): void {
    this.renderer.addClass(this.fileDrop, 'file-hover');
  }

  public onFileLeave(): void {
    this.renderer.removeClass(this.fileDrop, 'file-hover');
  }
}
