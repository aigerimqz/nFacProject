import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../services/post.service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  updateForm: FormGroup;
  postId: number = 0;
  isLoading = true;
  selectedFile: File | null = null;
  currentImageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private location: Location
  ) {
    this.updateForm = this.fb.group({
      text: [''],
      image: [null]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.postId = id ? +id : 0;
    this.loadPost();
  }

  loadPost(): void {
    this.postService.getPost(this.postId).subscribe({
      next: (post) => {
        this.updateForm.patchValue({
          text: post.text
        });
        this.currentImageUrl = post.image || null;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading post:', err);
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];
      this.updateForm.patchValue({
        image: this.selectedFile
      });
      
  
      if (this.selectedFile) {
        this.currentImageUrl = URL.createObjectURL(this.selectedFile);
      } else {
        this.currentImageUrl = null;
      }
    }
  }

  onSubmit(): void {
    if (this.updateForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('text', this.updateForm.get('text')?.value);
    
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.postService.updatePost(this.postId, formData).subscribe({
      next: () => {
        this.router.navigate(['/posts', this.postId]);
      },
      error: (err) => {
        console.error('Error updating post:', err);
        if (err.error) {
          console.log('Server validation errors:', err.error);
        }
      }
    });
  }
  goBack(){
    this.location.back();
  }
}