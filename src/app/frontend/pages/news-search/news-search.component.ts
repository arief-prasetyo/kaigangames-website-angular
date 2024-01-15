import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Press } from 'src/app/models/backend/press.model';
import { BackendService } from 'src/app/services/backend.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.component.html',
  styleUrls: ['./news-search.component.sass']
})
export class NewsSearchComponent {
  pressData: Press[]=[];
  pressDataLength: number | undefined;
  p: number = 1;
  faSearch = faSearch;
  faCircleExclamation = faCircleExclamation;
  // reactive form
  form!: FormGroup;
  submitted = false;
  keywords: any;
  searchby: any;

  constructor(private route: ActivatedRoute, 
    private backendService: BackendService,
    private ngxFavicon: AngularFaviconService, 
    private formBuilder: FormBuilder,
    private router: Router){
    $('body').removeClass("bg-theme2");  
    // this.retrievePressData();
  }

  ngOnInit(): void {
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
    this.route.queryParams.subscribe(params => {
      this.searchby = params['searchby'];
      this.keywords = params['keywords'];
      
      this.backendService.news_search(this.keywords.replace(/-/g, ' '), this.searchby).subscribe({
        next: (data) => {
          this.pressData = data;
          this.pressDataLength = data.length;
          console.log(this.pressData);
          console.log(' data length', this.pressDataLength);
          
        }
      })
    });
    this.reactiveForm();
  }

  reactiveForm(){
    this.form = this.formBuilder.group({
      searchBy: ['', Validators.required],
      keywords: ['', Validators.required]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(){
    let str = this.form.value.keywords;
    const formatedText = str.replace(/[\s;]+/g, "-")
    this.router.navigate(['/news/search'],{queryParams: {searchby: this.form.value.searchBy, keywords: formatedText}})
  }

  trackByFn(index: any, item: any) {
    return item.id;
  }
}
