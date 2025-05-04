import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit{

  userData: any;

  constructor(

    private route: ActivatedRoute,
    private userService: UserService
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
      }
  }

}
