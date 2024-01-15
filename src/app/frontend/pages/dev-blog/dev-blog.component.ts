import { Component } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { AngularFaviconService } from 'angular-favicon';
import { DevBlogTab } from '../../../models/backend/dev-blog-tab.model';
import { DevBlog } from '../../../models/backend/dev-blog.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-dev-blog',
  templateUrl: './dev-blog.component.html',
  styleUrls: ['./dev-blog.component.sass']
})
export class DevBlogComponent {
  devTabData?: DevBlogTab[];
  devBlogData?: DevBlog[];
  currentDevBlogData: DevBlog[]=[];
  activeTab?:string;
  index = 0;
  p: number = 1;
  devBlogEmpty: any;

  constructor(private backendService: BackendService, private ngxFavicon: AngularFaviconService){
    $('body').removeClass("bg-theme2");
    this.retreiveDevTabData();
    this.devDataDetail();
  }

  ngOnInit() {
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
  }

  retreiveDevTabData(){
    this.backendService.get_devBlogTab().subscribe(data => {
      this.devTabData = data;
      // console.log('dev tab',data);
    })
  }

  devDataDetail(){
    this.backendService.get_devBlogTabDetail(this.index).subscribe(data => {
      console.info(data.tab_data_target);
      let DT = data.tab_data_target;
      this.backendService.get_devBlogDetail(DT).subscribe(data => {
        this.currentDevBlogData = data;
        // console.log(' data debvlog', this.currentDevBlogData);
        if(Object.keys(this.currentDevBlogData).length == 0){
          console.log(' data empty');
          this.devBlogEmpty = true;
        } else {
          console.log('data exist');
          this.devBlogEmpty = false;
        }
      })
    })
  }

  handleChange(index: any) {
    this.backendService.get_devBlogTabDetail(index).subscribe(data => {
      console.info(data.tab_data_target);
      let DT = data.tab_data_target;
      this.backendService.get_devBlogDetail(DT).subscribe(data => {
        this.currentDevBlogData = data;
      })
    })
  }

  trackByFn(index: any, item: any) {
    return item.id;
  }
}
