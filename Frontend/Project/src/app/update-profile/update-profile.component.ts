import { Component, NgModule } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {
  bio: string = '';
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private userService: UserService){}

  onFileSelected(event: any){
    const file = event.target.files[0];
    if(file){
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('bio', this.bio);
    if(this.selectedFile){
      formData.append('profile_photo', this.selectedFile);
    }

    this.userService.updateProfile(formData).subscribe({
      next: res => alert('Profile updated!'),
      error: err => console.error(err)
    })
  }

}
