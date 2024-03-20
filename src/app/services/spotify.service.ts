import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  bearerToken = localStorage.getItem('spotifyToken');
  constructor(private http: HttpClient) {
    if(!this.bearerToken){
      this.getSpotifyToken().subscribe((data: any) => {
        localStorage.setItem('spotifyToken', data);
      });
    }
  }

  getSpotifyToken(){
    let apiUrl: string = environment.spotify.spotifyTokenUrl;
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${environment.spotify.clientId}:${environment.spotify.clientSecrets}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    return this.http.post(apiUrl, body.toString(), { headers: headers })
      .pipe( map((data : any) => {
        return data.access_token;
      }));
  }

  getToken(){
    this.refreshToken();

    return localStorage.getItem('spotifyToken');
  }

  refreshToken(){
    let token = localStorage.getItem('spotifyToken');
    if(!token){
      this.getSpotifyToken().subscribe(token => localStorage.setItem('spotifyToken', token));
    }
  }
  
  getQuery(query: string){
    const url: string = `${environment.spotify.baseUrlSpotify}${query}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() : Observable<object>{
    return this.getQuery('browse/new-releases')
      .pipe( map((data : any) => {
        return data.albums.items;
      }));
  }

  getArtists(pattern: string){
    return this.getQuery(`search?q='${pattern}'&type=artist`)
      .pipe(map((data : any) => {
        return data.artists.items;
      }));
  }

  getArtist(artistId: string){
    return this.getQuery(`artists/${artistId}`);
  }

  getTopTracks(artistId: string){
    return this.getQuery(`artists/${artistId}/top-tracks?country=us`)
    .pipe(map((data : any) => {
      return data.tracks;
    }));
  }
}
