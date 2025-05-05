import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, Token } from '../../models';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private client: HttpClient) { }

  login(userModel: User): Observable<Token>{
    return new Observable(observer => {
      this.client.post<Token>('http://127.0.0.1:8000/api/login/', userModel).subscribe({
        next: (token) => {
          localStorage.setItem('token', token.access);
          this.isLoggedInSubject.next(true); 
          observer.next(token);
          observer.complete();
        },
        error: err => observer.error(err)
      })
    })
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): User | null{
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user): null;
  }
  getToken(): string | null{
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false); 
  }

  checkLoginStatus(): boolean{
    return !!localStorage.getItem('token');
  }


  register(username: string, email: string, password: string, first_name: string, last_name: string): Observable<any> {
    return this.client.post(`${this.apiUrl}register/`, {
      username,
      email,
      password,
      password2: password,
      first_name,
      last_name
    });
  }
  
}
