import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PostListComponent } from '../post-list/post-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, PostListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
