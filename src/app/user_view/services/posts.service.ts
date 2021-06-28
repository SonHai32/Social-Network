import { Post } from './../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {


  constructor(private httpService: HttpClient) { }

  getAllPosts(): Observable<Post[]>{
    return this.httpService.get<Post[]>('https://60d5ab9d943aa60017768b2f.mockapi.io/posts').pipe()
  }
}
