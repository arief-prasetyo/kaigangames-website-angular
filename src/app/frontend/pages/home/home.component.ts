import { Component } from '@angular/core';
import { faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons'; 
import { About } from 'src/app/models/backend/about.model';
import { GameList } from 'src/app/models/backend/game-list.model';
import { Testimonials } from 'src/app/models/backend/testimonials.model';
import { BackendService } from 'src/app/services/backend.service';
import { AngularFaviconService } from 'angular-favicon';
import * as AOS from 'aos';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  gameListData?: GameList[];
  gameListData2?: GameList[];
  testimonialsData?: Testimonials[];
  testimonialsData2?: Testimonials[];
  aboutData?: About[];

  slideConfig = {
    "slidesToShow": 3, "slidesToScroll": 1, "infinite": true, "dots": true, "autoplay": true, "autoplaySpeed": 3000
  };
  slideConfigMD = {
    "slidesToShow": 2, "slidesToScroll": 1, "infinite": true, "dots": true, "autoplay": true, "autoplaySpeed": 3000
  };
  slideConfigSM = {
    "slidesToShow": 1, "slidesToScroll": 1, "infinite": true, "dots": true, "autoplay": true, "autoplaySpeed": 3000
  };
  
  slickInit(e: any) {
    // console.log('slick initialized');
  }
    
  breakpoint(e: any) {
    // console.log('breakpoint');
  }

  constructor(private backendService: BackendService, private ngxFavicon: AngularFaviconService){
    $('body').removeClass("bg-theme2");  
    this.retrieveAbout();
  }
  
  ngOnInit() {
    AOS.init();
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
    this.retrieveTestimonialData(); 

    $(window).on('scroll', function() {
      var scrollOnTop = $(window).scrollTop();
      $(".canvas-wrapper").css("opacity", 1 - scrollOnTop! / 500);
      
    })
  }

  ngAfterViewInit(): void {
    this.getGameListByParam();
  }

  expandBTN(){
    $('.no-expand-btn').css('display', 'block');
    $('.expand-btn').css('display', 'none');

    if($('.testimonial-card').hasClass('expand')){
      $('.testimonial-card').removeClass('expand');
      $('.testimonial-card').removeClass('d-flex').removeClass('justify-content-center');
      $('.limitTestimonialText').removeClass('hide').addClass('block');
      $('.fullTestimonialText').removeClass('block').addClass('hide');
    } else {
      $('.testimonial-card').addClass('expand');
      $('.testimonial-card').addClass('d-flex').addClass('justify-content-center');
      $('.limitTestimonialText').removeClass('block').addClass('hide');
      $('.fullTestimonialText').removeClass('hide').addClass('block');
    }
  }

  noExpandBTN(){
    // console.log('no expand click');
    $('.testimonial-card').removeClass('expand');
    $('.no-expand-btn').css('display', 'none');
    $('.expand-btn').css('display', 'block');
    $('.limitTestimonialText').removeClass('hide').addClass('block');
    $('.fullTestimonialText').removeClass('block').addClass('hide');
  }

  retrieveAbout(): void{
    this.backendService.getAllAbout().subscribe({
      next: (data) => {
        this.aboutData = data;
      },
      error: (e) => console.error(e)
    })
  }

  //get data
  retrieveTestimonialData(): void{
    this.backendService.get_testimonials().subscribe({
      next: (data) => {
        this.testimonialsData = data;
      },
      error: (e) => console.error(e)
    })
  }

  getGameListByParam(){
    this.backendService.get_GameList().subscribe({
      next: (data) => {
        this.gameListData = data;
      }
    })
  }

  trackByFn(index: any, item: any) {
    return item.id;
  }
}
