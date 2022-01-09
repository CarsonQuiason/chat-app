import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'chatRoom/:id', component: ChatRoomComponent, canActivate: [AuthGuard] } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
