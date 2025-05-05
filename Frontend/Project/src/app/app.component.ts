import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Project';
  isLoggedIn: boolean = false;
  constructor(
    public location: Location,
    private authService: AuthService,
    private router: Router
  ){}
  goBack(){
    this.location.back();
  }

  ngOnInit(): void {
      // this.isLoggedIn = this.authService.isLoggedIn();
      this.authService.isLoggedIn$.subscribe(status => {
        this.isLoggedIn = status;
      })
  }

  logout():void {
    const confirmed = window.confirm('Are you sure to logout?');
    if(confirmed){
      this.authService.logout();
      this.router.navigate(['/login']);
    }
    
  }
}
