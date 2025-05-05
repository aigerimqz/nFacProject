import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  profileData: any;
  currentUsername: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.userService.getProfile().subscribe({
        next: (data) => {
          this.profileData = data;
          this.profileData.posts.sort((a: any, b: any) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          });
          
          
          
        },
        error: (err) => {
          console.error('Error on loading profile: ', err);
        }
      })
  }

  viewPostDetail(postId: number): void {
    this.router.navigate(['/posts', postId]);
  }

  viewUserDetail(username: string): void{
    this.router.navigate(['/users', username]);
  }

}
