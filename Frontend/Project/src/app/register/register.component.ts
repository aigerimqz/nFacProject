import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formData = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      password2: this.registerForm.value.confirmPassword,
      first_name: this.registerForm.value.firstName,
      last_name: this.registerForm.value.lastName
    };

    this.authService.register(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        

        if (err.status === 201) {
          this.router.navigate(['/login']);
          return;
        }
        
        this.errorMessage = this.getErrorMessage(err);
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private getErrorMessage(err: any): string {
    if (err.error) {
      if (err.error.username) {
        return `Username error: ${Array.isArray(err.error.username) ? err.error.username.join(' ') : err.error.username}`;
      } else if (err.error.email) {
        return `Email error: ${Array.isArray(err.error.email) ? err.error.email.join(' ') : err.error.email}`;
      } else if (err.error.password) {
        return `Password error: ${Array.isArray(err.error.password) ? err.error.password.join(' ') : err.error.password}`;
      } else if (err.error.non_field_errors) {
        return Array.isArray(err.error.non_field_errors) ? err.error.non_field_errors.join(' ') : err.error.non_field_errors;
      }
    }
    return 'Registration failed. Please try again.';
  }
}