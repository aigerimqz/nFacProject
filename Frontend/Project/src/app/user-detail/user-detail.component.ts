import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { PostService } from '../services/post.service';
import { Post } from '../../models';
import { PostListComponent } from "../post-list/post-list.component";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, PostListComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit{

  userData: any;
  userPosts: Post[] = [];
  constructor(

    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private postService: PostService
  ){}

  ngOnInit(): void {
      const username = this.route.snapshot.paramMap.get('username');

      if(username){
        this.userService.getUserByUsername(username).subscribe({
          next: (data) => {
            this.userData = data;
          },
          error: (err) => {
            console.error('Error loading user profile: ', err);
          }
        })
        this.postService.getPostsByUser(username).subscribe(posts => {
          this.userPosts = posts;
        })
      }
  }

  viewPostDetail(postId: number): void {
    this.router.navigate(['/posts', postId]);
  }


}
