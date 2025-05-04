import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UpdatePostComponent } from './update-post/update-post.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: AuthComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'create-post', component: CreatePostComponent},
    {path: 'posts/:id', component: PostDetailComponent},
    {path: 'posts/:id/update', component: UpdatePostComponent}
];
