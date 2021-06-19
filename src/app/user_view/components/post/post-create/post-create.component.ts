import { HomeComponent } from './../../home/home.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'home-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  @ViewChild('inputTag', { static: false }) inputTagRef?: ElementRef;
  @ViewChild('postContentInput', { static: false })
  postContentInputRef?: ElementRef;
  inputTagVisible: boolean = false;
  addTagLabelVisible: boolean = false;
  tags: string[] = [];
  inputTagValue: string = '';

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
      this.postContentInputRef?.nativeElement.focus();
  }

  showInputTag() {
    this.inputTagVisible = true;

    setTimeout(() => {
      this.inputTagRef?.nativeElement.focus();
    }, 10);
  }

  submitTag(): void {
    if (this.inputTagValue && this.tags.indexOf(this.inputTagValue) === -1) {
      this.tags = [...this.tags, this.inputTagValue];
      this.affterTagSubmit();
    } else {
      this.affterTagSubmit();
    }
  }

  affterTagSubmit() {
    this.inputTagValue = '';
    this.inputTagVisible = false;
  }

  removeTag(removeTag: string) {
    this.tags = this.tags.filter((tag: string) => tag !== removeTag);

    setTimeout(() => {
      if (this.tags.length === 0) {
        this.addTagLabelVisible = false;
      }
    }, 10);
  }

  showTagLabel(): void {
    this.addTagLabelVisible = true;

    setTimeout(() => {
      if (this.tags.length === 0) {
        this.addTagLabelVisible = false;
      }
    }, 10000);
  }
}
