import { Component, Input } from '@angular/core';
import { NoimagePipe } from '../../pipes/noimage.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NoimagePipe],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() items: any[] = [];

  constructor(private router: Router){
  }

  seeArtist(item: any){
    let artistId: number = item.type === 'artist' ? item.id : item.artists[0].id;
    this.router.navigate([ 'artist', artistId]);
  }
}
