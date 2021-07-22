import { Post } from './../../../models/post.model';
import { Component, Input, OnInit } from '@angular/core';
import { NzImage, NzImageService } from 'ng-zorro-antd/image';
@Component({
  selector: 'home-post-card-content',
  templateUrl: './post-card-content.component.html',
  styleUrls: ['./post-card-content.component.scss'],
})
export class PostCardContentComponent implements OnInit {
  @Input('post') post!: Post;
  constructor(private nzImageService: NzImageService) {}
  commentInputValue: string = '';

  ngOnInit(): void {}
  addEmoji(event: any) {
    const { emoji } = event;
    this.commentInputValue += emoji.native;
  }

  previewListImage() {
    if (this.post.post_content.image_content) {
      // this.nzImageService.preview(this.post.post_content.image_content);
    }
  }
}
