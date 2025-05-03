import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://127.0.0.1:8000/api/posts/';


  constructor(private client: HttpClient) { }

  // getAllPosts():
}
