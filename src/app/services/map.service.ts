import { Injectable } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }
  
  link: String = '';
  
  zoom = "13";
  size = "150x150";
  maptype = "roadmap";
  apiKey = "AIzaSyAulqfVmzFMWQzM9M8Br2Ex4d_ziu0QUlM";
  
  async processLocation(center: String) {
    var formattedString = center.split(" ").join('+');
    this.generateLink(formattedString);
    }
    
    private generateLink(center: String) {

        this.link = "https://maps.googleapis.com/maps/api/staticmap?" 
        + "center=" + center
        + "&zoom=" + this.zoom
        + "&size=" + this.size 
        + "&maptype=" + this.maptype 
        + "&markers=color:purple|" + center
        + "&key=" + this.apiKey;
    }
}
