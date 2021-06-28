import { Post } from './../../../models/post.model';
import { Component, Input, OnInit } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
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

  previewListImage(){
    this.nzImageService.preview(this.post.images );
  }
}
