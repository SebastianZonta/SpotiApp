import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { NoimagePipe } from '../../pipes/noimage.pipe';
import { LoadingComponent } from '../shared/loading/loading.component';
import { DomSecurePipe } from '../../pipes/dom-secure.pipe';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [NoimagePipe, RouterModule, LoadingComponent, DomSecurePipe],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
  providers: [SpotifyService]
})
export class ArtistComponent {
  artist: any = {};
  topTracks: any[] = [];

  isLoading: boolean = true;
  constructor(private router: ActivatedRoute, private spotify: SpotifyService){
    this.router.params.subscribe((data:any) => {
      this.spotify.getArtist(data.id).subscribe(data => {
        this.artist = data;
        this.isLoading = false;
      });
      this.spotify.getTopTracks(data.id).subscribe(data => {
        this.topTracks = data;
        console.log(this.topTracks);
      });
    });
  }
}
