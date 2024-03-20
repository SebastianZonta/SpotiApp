import { HttpClientModule  } from '@angular/common/http';
import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { NoimagePipe } from '../../pipes/noimage.pipe';
import { CardsComponent } from '../cards/cards.component';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, NoimagePipe, CardsComponent, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: []
})
export class HomeComponent {
  newSongs: any[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = "";
  constructor(private spotify: SpotifyService){
      this.spotify
      .getNewReleases()
      .subscribe({
        next: (data:any) => {
          this.newSongs = data;
          this.isLoading = false;
        },
        error: (error : any) => {
          console.log(error);
          this.hasError = true;
          this.errorMessage = error.error.error.message;
          spotify.refreshToken();
        }
      })
  }
}
