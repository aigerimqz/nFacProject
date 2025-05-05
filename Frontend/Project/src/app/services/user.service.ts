import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private profileUrl = 'https://nfacproject.onrender.com/api/profile/';

  constructor(private client: HttpClient) { }

  getProfile(): Observable<any> {
    return this.client.get<any>(this.profileUrl);
  }

  updateProfile(data: FormData): Observable<any> {
    return this.client.put('https://nfacproject.onrender.com/api/profile/update/', data);
  }

  getUserById(id: number): Observable<any> {
    return this.client.get<any>(`https://nfacproject.onrender.com/api/users/${id}/`);
  }
  
  getUserByUsername(username: string): Observable<any> {
    return this.client.get<any>(`https://nfacproject.onrender.com/api/users/${username}/`);
  }
}
