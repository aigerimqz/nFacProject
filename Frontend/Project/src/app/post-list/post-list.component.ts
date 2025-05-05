import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models';
import { PostService } from '../services/post.service';
import { CommonModule } from '@angular/common';
import { PostDetailComponent } from '../post-detail/post-detail.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit{
  @Input() posts: Post[] = [];

  // posts: Post[] = [];
  profileData: any;
  isLoading = true;


  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.loadPosts();
      this.loadProfile();
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
  loadProfile():void {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.profileData = data;
        
        
      },
      error: (err) => {
        console.error('Error on loading profile: ', err);
      }
    })
  }

  viewUserDetail(username: string): void {
    this.router.navigate(['/users', username]);
  }

  viewPostDetail(postId: number): void {
    this.router.navigate(['/posts', postId]);
  }
  

}
