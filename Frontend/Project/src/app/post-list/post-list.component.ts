import { Component, OnInit } from '@angular/core';
import { Post } from '../../models';
import { PostService } from '../services/post.service';
import { CommonModule } from '@angular/common';
import { PostDetailComponent } from '../post-detail/post-detail.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit{
  posts: Post[] = [];
  isLoading = true;

  constructor(
    private postService: PostService
  ){}

  ngOnInit(): void {
      this.loadPosts();
  }
  loadPosts():void {
    this.isLoading = true;
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
      },
      error : (err) => {
        console.error('Error loading posts', err);
        this.isLoading = false;
      }
    })
  }

}
