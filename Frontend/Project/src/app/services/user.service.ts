import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private profileUrl = 'http://127.0.0.1:8000/api/profile/';

  constructor(private client: HttpClient) { }

  getProfile(): Observable<any> {
    return this.client.get<any>(this.profileUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.client.get<any>(`http://127.0.0.1:8000/api/users/${id}/`);
  }
  
  getUserByUsername(username: string): Observable<any> {
    return this.client.get<any>(`http://127.0.0.1:8000/api/users/${username}/`);
  }
}
