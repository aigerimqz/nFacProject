import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit(){
    if(this.registerForm.invalid) return;

    if(this.registerForm.value.password !== this.registerForm.value.confirmPassword){
      this.errorMessage = "Passwords don't match";
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    const { username, email, password, firstName, lastName } = this.registerForm.value;

    this.authService.register( username, email, password, firstName, lastName).subscribe({
      next: () => {
        alert('You registered successfully! Now login.')
        this.router.navigate(['/login']);

      },
      error: (err) => {
        this.errorMessage = err.error || 'Registration failed';
        this.isLoading = false;
      }
    });
  }

}
