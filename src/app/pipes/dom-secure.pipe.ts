import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'domSecure',
  standalone: true
})
export class DomSecurePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer){

  }
  transform(value: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(`https://open.spotify.com/embed?uri=${value}`);
  }

}
