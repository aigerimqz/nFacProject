import { Component, OnInit } from '@angular/core';
import { Post } from '../../models';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../services/post.service';
import { CommonModule, Location } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit{

  post!: Post;
  currentUser: any;
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ){}

  ngOnInit(): void {
      this.getPost();
      this.currentUser = this.authService.getCurrentUser();
      
  }

  isAuthor(): boolean{
    return this.post && this.post.author.id === this.currentUser.id;
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

  updatePost(): void{
    this.router.navigate(['/posts', this.post.id, 'update']);
  }

  deletePost(): void {
    if(confirm('Are you sure to delete this post?')){
      this.isLoading = true;
      this.postService.deletePost(this.post.id).subscribe({
        next: () => {
          this.router.navigate(['/profile']);
          alert('Post deleted')
        },
        error: (err) => {
          console.log('Error deleting post: ', err);
          alert('Failed to delete post');
          this.isLoading = false;
        }
      })
    }
  }

  goBack(){
    this.location.back();
  }

}
