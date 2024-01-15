import { Component } from '@angular/core';
import { BackendService } from "../../../services/backend.service";
import { About } from "../../../models/backend/about.model";
import { AboutTeamImage } from "../../../models/backend/about-team-image.model";
import * as AOS from 'aos';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent {
  aboutData?: About[];
  aboutTeamImageData?: AboutTeamImage[];
  lifeAtKaiganSection: any;
  currentURL: any;

  slideConfig = {
    "slidesToShow": 4, "slidesToScroll": 1, "infinite": true, "dots": true, "autoplay": true, "autoplaySpeed": 3000
  };
  slideConfigMD = {
    "slidesToShow": 3, "slidesToScroll": 1, "infinite": true, "dots": true, "autoplay": true, "autoplaySpeed": 3000
  };
  slideConfigSM = {
    "slidesToShow": 2, "slidesToScroll": 1, "infinite": true, "dots": true, "autoplay": true, "autoplaySpeed": 3000
  };
  
  slickInit(e: any) {
    // console.log('slick initialized');
  }
    
  breakpoint(e: any) {
    // console.log('breakpoint');
  }

  awardImage = [
    {
      'id': 1,
      'image': './assets/frontend/Awards/21.png'
    },
    {
      'id': 2,
      'image': './assets/frontend/Awards/20.png'
    },
    {
      'id': 3,
      'image': './assets/frontend/Awards/19.png'
    },
    {
      'id': 4,
      'image': './assets/frontend/Awards/18.png'
    },
    {
      'id': 5,
      'image': './assets/frontend/Awards/17.png'
    },
    {
      'id': 6,
      'image': './assets/frontend/Awards/16.png'
    },
    {
      'id': 7,
      'image': './assets/frontend/Awards/15.png'
    },
    {
      'id': 8,
      'image': './assets/frontend/Awards/14.png'
    },
    {
      'id': 9,
      'image': './assets/frontend/Awards/13.png'
    },
    {
      'id': 10,
      'image': './assets/frontend/Awards/12.png'
    },
    {
      'id': 11,
      'image': './assets/frontend/Awards/11.png'
    },
    {
      'id': 12,
      'image': './assets/frontend/Awards/10.png'
    },
    {
      'id': 13,
      'image': './assets/frontend/Awards/9.png'
    },
    {
      'id': 14,
      'image': './assets/frontend/Awards/8.png'
    },
    {
      'id': 15,
      'image': './assets/frontend/Awards/7.png'
    },
    {
      'id': 16,
      'image': './assets/frontend/Awards/6.png'
    },
    {
      'id': 17,
      'image': './assets/frontend/Awards/5.png'
    },
    {
      'id': 18,
      'image': './assets/frontend/Awards/4.png'
    },
    {
      'id': 19,
      'image': './assets/frontend/Awards/3.png'
    },
    {
      'id': 20,
      'image': './assets/frontend/Awards/2.png'
    },
    {
      'id': 21,
      'image': './assets/frontend/Awards/1.png'
    }
  ];

  defaultImage = './assets/frontend/photos/KaiganGames3_FHD.webp';

  constructor(private backendService: BackendService, private router: Router, private ngxFavicon: AngularFaviconService){
    $('body').removeClass("bg-theme2");
    this.retrieveAbout();
    this.retrieveAboutTeamImage();
  }

  ngOnInit(): void {
    AOS.init();
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');

    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }

  retrieveAbout(): void{
    this.backendService.getAllAbout().subscribe({
      next: (data) => {
        this.aboutData = data;
      },
      error: (e) => console.error(e)
    })
  }

  retrieveAboutTeamImage(): void{
    this.backendService.get_AboutTeamImage().subscribe({
      next: (data) => {
        this.aboutTeamImageData = data;
      },
      error: (e) => console.error(e)
    })
  }

  trackByFn(index: any, item: any) {
    return item.id;
  }
}
