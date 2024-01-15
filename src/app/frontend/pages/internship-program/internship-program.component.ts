import { Component } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { InternshipPerks } from '../../../models/backend/internship-perks.model';
import * as AOS from 'aos';
import { InternshipSlider } from '../../../models/backend/internship-slider.model';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-internship-program',
  templateUrl: './internship-program.component.html',
  styleUrls: ['./internship-program.component.sass']
})
export class InternshipProgramComponent {
  InternshipPerks?: InternshipPerks[];
  internshipData?: InternshipSlider[];

  constructor(private backendService: BackendService, private ngxFavicon: AngularFaviconService){
    $('body').removeClass("bg-theme2");
    this.retrieveInternshipPerks();
    this.retrieveInternshipSliderData();
  }

  ngOnInit() {
    AOS.init();
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
  }

  //get slider data
  retrieveInternshipSliderData(): void{
    this.backendService.get_internshipSlider().subscribe({
      next: (data) => {
        this.internshipData = data;
      },
      error: (e) => console.error(e)
    })
  }

  //get perks data
  retrieveInternshipPerks(): void{
    this.backendService.get_internshipPerks().subscribe({
      next: (data) => {
        this.InternshipPerks = data;
      },
      error: (e) => console.error(e)
    })
  }

  trackByFn(index: any, item: any) {
    return item.id;
  }
}
