import { Post } from './../../models/post.model';
import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    // this.getAllPost()
  }

  // getAllPost(){
  //   this.postsService.getAllPosts().subscribe((posts: Post[]) =>{
  //     this.posts = posts
  //   })
  // }
}
