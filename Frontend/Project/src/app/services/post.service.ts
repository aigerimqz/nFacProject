import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://127.0.0.1:8000/api/posts/';  

  constructor(private http: HttpClient) { }

  getPost(id: number): Observable<Post>{
    return this.http.get<Post>(`${this.apiUrl}${id}/`);
  }

  createPost(formData: FormData): Observable<any> {
    
    return this.http.post(`${this.apiUrl}create/`, formData);
  }
}