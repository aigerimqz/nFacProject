import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  postForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router, 
    private authService: AuthService
  ) {
    this.postForm = this.fb.group({
      text: [''],
      image: [null]
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];
      this.postForm.patchValue({
        image: this.selectedFile
      });
    }
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }
  
    const formData = new FormData();
    formData.append('text', this.postForm.get('text')?.value);
    


    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
  
    this.postService.createPost(formData).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: err => {
        console.error("Error creating post: ", err);
      
        if (err.error) {
          console.log("Server validation errors:", err.error);
        }
      }
    });
  }
}