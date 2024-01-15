import { Component } from '@angular/core';
import { DevBlog } from '../../../models/backend/dev-blog.model';
import { BackendService } from '../../../services/backend.service';
import { AngularFaviconService } from 'angular-favicon';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dev-blog-detail',
  templateUrl: './dev-blog-detail.component.html',
  styleUrls: ['./dev-blog-detail.component.sass']
})
export class DevBlogDetailComponent {
  currentDevBlogData?: DevBlog[]=[];
  slug: any;

  constructor(private backendService: BackendService, private ngxFavicon: AngularFaviconService, private route: ActivatedRoute){
    $('body').removeClass("bg-theme2");
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');

    this.slug = this.route.snapshot.params['slug'];
    this.backendService.get_devBlogArticleDetail(this.slug).subscribe(data => {
      this.currentDevBlogData = data;
      console.log(this.currentDevBlogData);
    })
  }

  trackByFn(index: any, item: any) {
    return item.id;
  }
}
