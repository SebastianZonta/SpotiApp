import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [SpotifyService]
})
export class AppComponent {
  title = 'SpotiApp';

  constructor(private spotify: SpotifyService){
    spotify.getSpotifyToken().subscribe(token => {
      localStorage.setItem('spotifyToken', token);
    });
  }
}
