import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, Token } from '../../models';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private client: HttpClient) { }

  fetchCurrentUser(): Observable<User> {
    return this.client.get<User>(`${this.apiUrl}profile/`);
  }
  

  login(userModel: User): Observable<Token>{
    return new Observable(observer => {
      this.client.post<Token>('http://127.0.0.1:8000/api/login/', userModel).subscribe({
        next: (token) => {
          localStorage.setItem('token', token.access);
          this.isLoggedInSubject.next(true); 


          this.fetchCurrentUser().subscribe({
            next: (user) => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              observer.next(token);
              observer.complete();
            },
            error: err => observer.error(err)
          })
          
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


  register(userData: any): Observable<any> {
    return this.client.post(`${this.apiUrl}register/`, userData).pipe(
      map(response => {
  
        return response;
      }),
      catchError(error => {
       
        if (error.status === 201) {
          return of(error.error); 
        }
        return throwError(() => error);
      })
    );
  }
  
}
