import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.css']
})
export class CropImageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CropImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    imageChangedEvent: any = '';
    croppedImage: any = '';

  ngOnInit() {

    this.imageChangedEvent = this.data
    
  }

 

  // fileChangeEvent(event: any): void {
  //   this.imageChangedEvent = event;
  // }
  imageCropped(image: ImageCroppedEvent) {
    this.croppedImage = image.file;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }



}
