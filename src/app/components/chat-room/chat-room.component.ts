import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  chat$: Observable<any>;
  newMsg: string;

  constructor(private route: ActivatedRoute, public cs: ChatService) { }

  ngOnInit(): void {
    const chatId = this.route.snapshot.paramMap.get('id');
    const source = this.cs.getChat(chatId);
    this.chat$ = this.cs.connectUsertoMsg(source);
  }

  submit(chatId) {
    if(!this.newMsg) {
      return alert('Please enter text')
    }
    this.cs.sendMsg(chatId, this.newMsg);
    this.newMsg = ''
  }

  trackByCreated(i, msg) {
    return msg.timeCreated;
  }
  
  
  // This function returns 1 if the user is trying to send a chat. 2 is the user is trying to send a map and 3 if the user is trying to send a gif.
    checkLink(content: String) {
        if (content.includes("https://maps.googleapis.com/maps/api/staticmap?")) {
            return 2;
        } else if (content.includes("https://media")) {
            return 3;
        } else {
            return 1;
        }
  }

}
