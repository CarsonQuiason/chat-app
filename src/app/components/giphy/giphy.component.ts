import { Component, OnInit } from '@angular/core';
import { GifDataService } from 'src/app/services/gif-data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.scss']
})
export class GiphyComponent implements OnInit {
  gifs: any[] = [];
  constructor(private dataService: GifDataService, public route: ActivatedRoute, public cs: ChatService) { }

  search(searchTerm: string){
    if(searchTerm !== '') {
      this.dataService.searchGifs(searchTerm)
      .subscribe((response: any) => {
        console.log('Search Data', response);
        this.gifs = response.data;
      });
    }
  }
  
  chat$: Observable<any>;
  newMsg: string;
  ngOnInit(): void {
    const chatId = this.route.snapshot.paramMap.get('id');
    const source = this.cs.getChat(chatId);
    this.chat$ = this.cs.connectUsertoMsg(source);

  }
  
  
  submit(chatId, link) {
    if(!link) {
      return alert('Please enter text')
    }
    this.cs.sendMsg(chatId, link);
    link = ''
  }

}
