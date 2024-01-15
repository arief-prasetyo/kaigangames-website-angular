import { Component } from '@angular/core';
import * as $ from 'jquery';
import { BackendService } from "../../../services/backend.service";
import { Press } from '../../../models/backend/press.model';
import { AngularFaviconService } from 'angular-favicon';
//fontawesome
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent {
  pressData: Press[]=[];
  p: number = 1;
  faSearch = faSearch;
  // reactive form
  form!: FormGroup;
  submitted = false;

  constructor(private backendService: BackendService, 
    private ngxFavicon: AngularFaviconService, 
    private formBuilder: FormBuilder,
    private router: Router){
    $('body').removeClass("bg-theme2");  
    this.retrievePressData();
  }

  ngOnInit(): void {
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
    this.reactiveForm();
  }

  reactiveForm(){
    this.form = this.formBuilder.group({
      searchBy: ['', Validators.required],
      keywords: ['', Validators.required]
    })
  }

  retrievePressData(): void{
    this.backendService.get_press().subscribe({
      next: (data) => {
        this.pressData = data;
      },
      error: (e) => console.error(e)
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let str = this.form.value.keywords;
    const formatedText = str.replace(/[\s;]+/g, "-")
    this.router.navigate(['/news/search'],{queryParams: {searchby: this.form.value.searchBy, keywords: formatedText}})
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  trackByFn(index: any, item: any) {
    return item.id;
  }
}
