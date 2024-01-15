import { Component } from '@angular/core';
import { AboutTeamImage } from "../../../models/backend/about-team-image.model";
import * as AOS from 'aos';
import { BackendService } from "../../../services/backend.service";
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-life-at-kaigan',
  templateUrl: './life-at-kaigan.component.html',
  styleUrls: ['./life-at-kaigan.component.sass']
})
export class LifeAtKaiganComponent {
  aboutTeamImageData?: AboutTeamImage[];
  aboutTeamImageData_2?: AboutTeamImage[];
  aboutTeamImageData_3?: AboutTeamImage[];
  aboutTeamImageData_4?: AboutTeamImage[];
  aboutTeamImageData_5?: AboutTeamImage[];
  aboutTeamImageData_6?: AboutTeamImage[];

  settings = {
    counter: true,
    plugins: [lgZoom],
    download: false
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  constructor(private backendService: BackendService, private ngxFavicon: AngularFaviconService){
    $('body').removeClass("bg-theme2");
    this.retrieveAboutTeamImage();
  }

  ngOnInit(): void {
    AOS.init();
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
  }
  
  retrieveAboutTeamImage(): void{
    this.backendService.get_AboutTeamImage().subscribe({
      next: (data) => {
        //full data
        this.aboutTeamImageData = data;
        console.log(this.aboutTeamImageData);
        
        //first image and 2nd image
        this.aboutTeamImageData_2 = this.aboutTeamImageData.slice(0, 1+1);
        //3rd to 6th image
        this.aboutTeamImageData_3 = this.aboutTeamImageData.slice(2, 2+3);
        //6th to 7th image
        this.aboutTeamImageData_4 = this.aboutTeamImageData.slice(5, 5+2);
        //8th to 10th image
        this.aboutTeamImageData_5 = this.aboutTeamImageData.slice(7, 7+3);
        //11th image
        this.aboutTeamImageData_6 = this.aboutTeamImageData.slice(10, 10+2);
      },
      error: (e) => console.error(e)
    })
  }

  trackByFn(index: any, item: any) {
    return item.id;
  }
}
