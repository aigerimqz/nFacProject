import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://127.0.0.1:8000/api/posts/';  

  constructor(private client: HttpClient) { }

  getPosts():Observable<Post[]>{
    return this.client.get<Post[]>(this.apiUrl);
  }

  getPostsByUser(username: string):Observable<Post[]> {
    return this.client.get<Post[]>(`http://127.0.0.1:8000/api/users/${username}/posts/`)
  }

  getPost(id: number): Observable<Post>{
    return this.client.get<Post>(`${this.apiUrl}${id}/`);
  }

  createPost(formData: FormData): Observable<any> {
    
    return this.client.post(`${this.apiUrl}create/`, formData);
  }

  updatePost(id: number, postData: FormData): Observable<Post> {
    return this.client.put<Post>(`${this.apiUrl}${id}/update/`, postData);
  }

  deletePost(id: number): Observable<any>{
    return this.client.delete(`${this.apiUrl}${id}/delete/`);
  }
}