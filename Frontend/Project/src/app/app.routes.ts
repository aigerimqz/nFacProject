import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: AuthComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'profile/update', component: UpdateProfileComponent},
    {path: 'create-post', component: CreatePostComponent},
    {path: 'posts/:id', component: PostDetailComponent},
    {path: 'posts/:id/update', component: UpdatePostComponent},
    {path: 'users/:username', component: UserDetailComponent}
];
