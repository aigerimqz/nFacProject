import { Component } from '@angular/core';
import { User } from '../../models';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  userModel: User;

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    // private router: Router,
    // private route: ActivatedRoute
  ){
    this.userModel = {} as User;
    
  }

  onLogin(): void {
    this.authService.login(this.userModel).subscribe({
      next: (token) => {
        localStorage.setItem('access', token.access);
        localStorage.setItem('refresh', token.refresh);
      
      },
      error: () => {
        this.errorMessage = 'Wrong username or password';
      }
    });
  }


}
