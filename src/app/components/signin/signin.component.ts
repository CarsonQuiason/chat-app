import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  userCreatedChatRooms$
  allChatRooms$

  title: string;

  constructor(public auth: AuthService, public cs: ChatService){
    
  }

  ngOnInit(): void {
    this.userCreatedChatRooms$ = this.cs.getUserCreatedChats();
    this.allChatRooms$ = this.cs.getAllChats();
  }

  submitRoom(title){
    if(!this.title) {
      return alert('Room must have a title')
    }
    this.cs.createRoom(title);
  }
}
