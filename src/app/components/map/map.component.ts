import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  linkForm = new FormControl('');
  constructor(public map: MapService, public route: ActivatedRoute, public cs: ChatService) { }
  
  processLocation() {
        this.map.processLocation(this.linkForm.value);
  } 

    chat$: Observable<any>;
    newMsg: string;

  ngOnInit(): void {
    const chatId = this.route.snapshot.paramMap.get('id');
    const source = this.cs.getChat(chatId);
    this.chat$ = this.cs.connectUsertoMsg(source);
  }
  
  submit(chatId) {
    this.map.processLocation(this.linkForm.value);
    var link = this.map.link;
    if(!link) {
      return alert('Please enter text')
    }
    this.cs.sendMsg(chatId, link);
    link = ''
  }
}
