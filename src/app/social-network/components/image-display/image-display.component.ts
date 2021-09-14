import { Component, OnInit, Input } from '@angular/core';
import { NzImage, NzImageService } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss'],
})
export class ImageDisplayComponent implements OnInit {
  @Input('containerSize') containerSize: number = 220;
  @Input('imageList') imageList: NzImage[] = [];
  imageSize: number = 0;
  containerSpace: number = 2;
  constructor(private nzImageService: NzImageService) {}

  imagePreview(index: number) {
    this.nzImageService.preview(this.imageList).switchTo(index);
  }
  ngOnInit(): void {
    if (this.imageList.length > 1 && this.imageList.length <= 2) {
      this.imageSize = this.containerSize / 2.1 - this.containerSpace;
    } else if (this.imageList.length > 2) {
      this.imageSize = this.containerSize / 3.2 - this.containerSpace;
    } else {
      this.imageSize = this.containerSize;
    }
  }
}
