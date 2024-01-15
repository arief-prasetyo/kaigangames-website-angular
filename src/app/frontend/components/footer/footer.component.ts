import { Component } from '@angular/core';
//fontawesome
import { faFacebook, faTwitter, faDiscord, faInstagramSquare, faYoutubeSquare} from '@fortawesome/free-brands-svg-icons'; 

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
  faDS = faDiscord;
  faFB = faFacebook;
  faTW = faTwitter;
  faIG = faInstagramSquare;
  faYT = faYoutubeSquare;

  currentYear = new Date().getFullYear()
}
