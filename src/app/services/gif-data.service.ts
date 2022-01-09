import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GifDataService {

  constructor(private http: HttpClient) { }

  getTrendingGifs() {
    return this.http.get('https://api.giphy.com/v1/gifs/trending?api_key=' + environment.giphyApiKey + '&limit=5');
  }

  searchGifs(gifName: string) {
    return this.http.get('https://api.giphy.com/v1/gifs/search?q='+gifName+'&api_key=' + environment.giphyApiKey + '&limit=5');
  }


}
