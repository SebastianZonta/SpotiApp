import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { NoimagePipe } from '../../pipes/noimage.pipe';
import { CardsComponent } from '../cards/cards.component';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NoimagePipe, CardsComponent, LoadingComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  artists: any[] = [];
  isLoading: boolean = false;
  constructor(private spotify: SpotifyService){

  }
  searchArtist(artistName: string){
    this.isLoading = true;
    this.spotify.getArtists(artistName).subscribe((data: any) => {
      this.artists = data;
      this.isLoading = false;
    });
  }
}
