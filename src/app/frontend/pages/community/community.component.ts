import { Component } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { Community } from '../../../models/backend/community.model';
import * as AOS from 'aos';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.sass']
})
export class CommunityComponent {
  communityData?: Community[];
  CDL: any;
  constructor(private backendService: BackendService, private ngxFavicon: AngularFaviconService){
    $('body').removeClass("bg-theme2");
    this.retrieveCommunityData();
  }

  ngOnInit() {
    AOS.init();
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
  }

  retrieveCommunityData(): void{
    this.backendService.get_Community().subscribe({
      next: (data) => {
        this.communityData = data;
        this.CDL = data.length;
      },
      error: (e) => console.error(e)
    })
  }

  trackByFn(index: any, item: any) {
    return item.id;
  }
}
