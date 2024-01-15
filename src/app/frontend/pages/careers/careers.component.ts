import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as AOS from 'aos';
import { BackendService } from "../../../services/backend.service";
import { CareerOpenPosition } from '../../../models/backend/career-open-position.model';
import { BenefitIcon } from '../../../models/backend/benefit-icon.model';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.sass']
})
export class CareersComponent {
  OpenPositionData?: CareerOpenPosition[];
  detailOpenPosition: CareerOpenPosition = new CareerOpenPosition();
  id?: number;
  countData?: number;
  BenefitPerksData?: BenefitIcon[];
  mouseOver: boolean;
  index: any;

  constructor(private router: Router, private backendService: BackendService, private ngxFavicon: AngularFaviconService){
    this.mouseOver = false;
  }

  ngOnInit(): void {
    $('body').removeClass("bg-theme2");
    AOS.init();
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
    this.retrieveOpenPosition();
    this.retrieveBenefitPerksData();
    this.hoverImage(this.index);
    this.backNormal(this.index);
  }

  clickLink(id: any){
    this.router.navigate([`career/detail/job-id/${id}`]);
  }

  //get data
  retrieveOpenPosition(): void{
    this.backendService.get_OpenPosition().subscribe({
      next: (data) => {
        this.OpenPositionData = data;    
        this.countData = data.length;    
      },
      error: (e) => console.error(e)
    })
  }

  //get data
  retrieveBenefitPerksData(): void{
    this.backendService.get_BenefitIcon().subscribe({
      next: (data) => {
        this.BenefitPerksData = data;
      },
      error: (e) => console.error(e)
    })
  }

  hoverImage(i: any): void{
    $(".normalImage-"+i).addClass('hide');
    $(".hoverImage-"+i).removeClass('hide');
  }

  backNormal(i: any): void{
    $(".hoverImage-"+i).addClass('hide');
    $(".normalImage-"+i).removeClass('hide');
  }

  trackByFn(index: any, item: any) {
    return item.id;
  }
}
