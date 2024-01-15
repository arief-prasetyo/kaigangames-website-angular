import { Component } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { Community } from '../../../models/backend/community.model';
import { ActivatedRoute } from '@angular/router';
import { CommunityHighlights } from 'src/app/models/backend/community-highlights.model';
import { CommunityHighlightSection } from 'src/app/models/backend/community-highlight-section.model';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-community-highlight',
  templateUrl: './community-highlight.component.html',
  styleUrls: ['./community-highlight.component.sass']
})
export class CommunityHighlightComponent {
  id: number | undefined;
  month: any;
  monthFormat: any;
  detailData: Community = new Community();
  communityData?: CommunityHighlights[];
  communityData2?: CommunityHighlightSection[];
  // communityData2?: Community[];

  constructor(private backendService: BackendService, private route: ActivatedRoute, private ngxFavicon: AngularFaviconService){
    $('body').removeClass("bg-theme2");
  }

  ngOnInit() {
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
    this.id = this.route.snapshot.params['id'];
    this.month = this.route.snapshot.params['month'];
    this.monthFormat = new Date(this.month).toISOString();
    this.communityDetail(this.id);
    this.communityHighlightDetail(this.monthFormat);
    this.retrieveCommunityHighlightSectionData(this.id);
  }

  communityDetail(id: any){
    this.backendService.get_communityDetail(id).subscribe(data => {
      this.detailData.image_path = data.image_path;
      this.detailData.community_highlight_title = data.community_highlight_title;
      this.detailData.createdAt = data.createdAt;
    })
  }

  communityHighlightDetail(month: any){
    this.backendService.detail_CommunityHighlight(month).subscribe(data => {
      this.communityData = data;
    })
  }

  retrieveCommunityHighlightSectionData(id: any){
    this.backendService.detail_CommunityHighlightSection(id).subscribe({
      next: (data) => {
        this.communityData2 = data;
      },
      error: (e) => console.error(e)
    })
  }

  trackByFn(index: any, item: any) {
    return item.id;
  }
}
