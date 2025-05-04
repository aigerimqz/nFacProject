import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  profileData: any;

  constructor(private userService: UserService){}

  ngOnInit(): void {
      this.userService.getProfile().subscribe({
        next: (data) => {
          this.profileData = data;
        },
        error: (err) => {
          console.error('Error on loading profile: ', err);
        }
      })
  }

}
