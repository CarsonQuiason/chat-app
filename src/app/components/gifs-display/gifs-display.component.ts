import { Component, OnInit } from '@angular/core';
import { GifDataService } from 'src/app/services/gif-data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-gifs-display',
  templateUrl: './gifs-display.component.html',
  styleUrls: ['./gifs-display.component.scss']
})
export class GifsDisplayComponent implements OnInit {
  gifs: any[] = [];
  constructor(private dataService: GifDataService, public route: ActivatedRoute, public cs: ChatService) { }

  ngOnInit(): void {
    this.dataService.getTrendingGifs()
      .subscribe((response: any) => {
        this.gifs = response.data;
      });
      
    const chatId = this.route.snapshot.paramMap.get('id');
    const source = this.cs.getChat(chatId);
    this.chat$ = this.cs.connectUsertoMsg(source);
  }
  
  chat$: Observable<any>;
  newMsg: string;

    submit(chatId, link) {
    if(!link) {
      return alert('Please enter text')
    }
    this.cs.sendMsg(chatId, link);
    link = ''
  }

}
