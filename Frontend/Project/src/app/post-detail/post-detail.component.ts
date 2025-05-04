import { Component, OnInit } from '@angular/core';
import { Post } from '../../models';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit{

  post!: Post;
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ){}

  ngOnInit(): void {
      this.getPost();
  }

  getPost(): void{
    const id = this.route.snapshot.paramMap.get('id');

    if(!id){
      this.error = 'No post id provided';
      this.isLoading = false;
      return;
    }

    this.postService.getPost(+id).subscribe({
      next: (data) => {
        this.post = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load post';
        this.isLoading = false;
        console.error(err);
      }
    })
  }

}
