import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Dimensions, ImageCroppedEvent, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import { UploaderService } from '../../services/uploader.service';
import { BehaviorSubject, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IUploadIMG } from '../../interfaces/uploader.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'ali-img-cropper',
  templateUrl: './img-cropper.component.html',
  styleUrls: ['./img-cropper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ImgCropperComponent {
  file: File | null = null;
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  maintainAspectRatio = false;

  @Input() title: string
  @Output() uploadImg: EventEmitter<any> = new EventEmitter<any>();


  @ViewChild('myInput') myInputVariable!: ElementRef;
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  max: number = 2;
  zoom: number = 0;
  transform: ImageTransform = {};
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  imageUrl = "";
  fileToUpload;



  constructor(
    private uploadService: UploaderService,
    private toasService:ToastrService,
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<ImgCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { file: File }
    ) { }
    
    onSliderChange(value) {
      this.zoom = value;
      const scale = value >= 0 ? value + 1 : 1 - (value / this.max) * -1;
      this.transform = { scale };
    }

    onClose() {
      this.dialogRef.close();
    }

    onAccept() {
      const event = this.imageCropper.crop();
      this.dialogRef.close(event);
    }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imageCropped(event)
    const files = event.target.files;
    this.fileToUpload = event.target.files[0];
    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);

    if (files) {
      this.status = "initial";
      this.file = files;
    }

  }
  imageCropped(event: ImageCroppedEvent) {
    debugger;
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);

    // this.croppedImage = event.objectUrl;

  }
  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    // cropper ready
    console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
    // show message
    console.log('Load failed');
  }

  clear() {
    this.croppedImage = '';
    this.imageChangedEvent = '';
    this.myInputVariable.nativeElement.value = '';
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation,
    };
  }

  onChange(event: any) {
    debugger;

    const files = event.target.files;
    this.fileToUpload = event.target.files[0];
    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);

    if (files) {
      this.status = "initial";
      this.file = files;
    }
  }

 
  onUpload() {
    debugger
      const upload$ = this.uploadService.uploadImage(this.file);
      this.status = "uploading";
      upload$.subscribe({
        next: (res:IUploadIMG) => {
          this.uploadService.getDataImg$.next(res.filename)
          this.status = "success";
          this.dismiss()
          this.toasService.success('عکس با موفقیت ذخیره شد')
        },
        error: (error: any) => {
          this.status = "fail";
          return throwError(() => error);
        },
      });
  }

  dismiss() {
    this.dialogRef.close()
  }
  changeMaintainAspectRatio = () => this.resetImage();

}
