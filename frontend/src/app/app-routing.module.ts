import { UserAnnouncementsComponent } from './user/user-announcements/user-announcements.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { CreateAnnouncementComponent } from './announcements/create-announcement/create-announcement.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:name', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'create-announcement',
    component: CreateAnnouncementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat-room/:id',
    component: ChatRoomComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-announcements',
    component: UserAnnouncementsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
