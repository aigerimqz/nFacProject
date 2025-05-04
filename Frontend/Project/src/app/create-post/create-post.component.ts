import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  postForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private client: HttpClient,
    private router: Router
  ){
    this.postForm = this.fb.group({
      text: [''],
      image: [null]
    })
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('text', this.postForm.get('text')?.value);
    if(this.selectedFile){
      formData.append('image', this.selectedFile);
    }

    this.client.post('http://127.0.0.1:8000/api/posts/create/', formData).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: err => {
        console.error("Error on creating new post: ", err);
      }
    })
  }

}
