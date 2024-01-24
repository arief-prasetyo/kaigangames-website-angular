import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //frontend
  { 
   path: '', 
   loadChildren: () => import('./frontend/pages/home/home.module').then(m => m.HomeModule),
   title: 'Welcome to Kaigan Games Official Website'
 },
 { 
   path: 'about', 
   loadChildren: () => import('./frontend/pages/about/about.module').then(m => m.AboutModule),
   title: 'Kaigan Games - About'
 },
 { 
   path: 'about/:section', 
   loadChildren: () => import('./frontend/pages/about/about.module').then(m => m.AboutModule),
   title: 'Kaigan Games - About'
 },
 { 
   path: 'about/photos/life-at-kaigangames', 
   loadChildren: () => import('./frontend/pages/life-at-kaigan/life-at-kaigan.module').then(m => m.LifeAtKaiganModule),
   title: 'Kaigan Games - Life at Kaigan'
 },
 { 
   path: 'benefits', 
   loadChildren: () => import('./frontend/pages/benefits/benefits.module').then(m => m.BenefitsModule),
   title: 'Kaigan Games - Benefits'
 },
 { 
   path: 'careers', 
   loadChildren: () => import('./frontend/pages/careers/careers.module').then(m => m.CareersModule),
   title: 'Kaigan Games - Careers'
 },
 { 
   path: 'community', 
   loadChildren: () => import('./frontend/pages/community/community.module').then(m => m.CommunityModule),
   title: 'Kaigan Games - Community'
 },
 { 
   path: 'community/highlight/:id/:month', 
   loadChildren: () => import('./frontend/pages/community-highlight/community-highlight.module').then(m => m.CommunityHighlightModule),
   title: 'Kaigan Games - Community Highlight'
 },
 { 
   path: 'contact', 
   loadChildren: () => import('./frontend/pages/contact/contact.module').then(m => m.ContactModule),
   title: 'Kaigan Games - Contact Us'
 },
 { 
   path: 'dev-blog/article/:slug', 
   loadChildren: () => import('./frontend/pages/dev-blog-detail/dev-blog-detail.module').then(m => m.DevBlogDetailModule),
   title: 'Kaigan Games - Dev Blog Detail'
 },
 { 
   path: 'dev-blog', 
   loadChildren: () => import('./frontend/pages/dev-blog/dev-blog.module').then(m => m.DevBlogModule),
   title: 'Kaigan Games - Dev Blog'
 },
 { 
   path: 'game/games', 
   loadChildren: () => import('./frontend/pages/home/home.module').then(m => m.HomeModule),
   title: 'Kaigan Games - Games'
 },
 { 
   path: 'game/detail/:id', 
   loadChildren: () => import('./frontend/pages/games/games.module').then(m => m.GamesModule),
   title: 'Kaigan Games - Game Detail'
 },
 { 
   path: 'career/internship-program', 
   loadChildren: () => import('./frontend/pages/internship-program/internship-program.module').then(m => m.InternshipProgramModule),
   title: 'Kaigan Games - Internship Program'
 },
 { 
   path: 'career/apply/job-id/:id', 
   loadChildren: () => import('./frontend/pages/job-application/job-application.module').then(m => m.JobApplicationModule),
   title: 'Kaigan Games - Apply for a Job'
 },
 { 
   path: 'career/detail/job-id/:id', 
   loadChildren: () => import('./frontend/pages/job-vacancy-detail/job-vacancy-detail.module').then(m => m.JobVacancyDetailModule),
   title: 'Kaigan Games - Job Vacancy Detail'
 },

 { 
   path: 'news', 
   loadChildren: () => import('./frontend/pages/news/news.module').then(m => m.NewsModule),
   title: 'Kaigan Games - News'
 },
 { 
   path: 'news/search', 
   loadChildren: () => import('./frontend/pages/news-search/news-search.module').then(m => m.NewsSearchModule),
   title: 'Kaigan Games - Search News'
 },
 { 
   path: 'press', 
   loadChildren: () => import('./frontend/pages/press/press.module').then(m => m.PressModule),
   title: 'Kaigan Games - Press'
 },
 //authnetication
 { 
   path: 'sign-in', 
   loadChildren: () => import('./frontend/auth/login/login.module').then(m => m.LoginModule),
   title: 'Kaigan Games - Sign In'
 },
 { 
   path: 'sign-up', 
   loadChildren: () => import('./frontend/auth/register/register.module').then(m => m.RegisterModule), 
   title: 'Kaigan Games - Sign Up'
 },
 { 
   path: 'forget-password', 
   loadChildren: () => import('./frontend/auth/forget-password/forget-password.module').then(m => m.ForgetPasswordModule),
   title: 'Kaigan Games - Forgot Password'
 },
 //backend
 { 
   path: 'admin/about', 
   loadChildren: () => import('./backend/about-backend/about-backend.module').then(m => m.AboutBackendModule), 
   title: 'Kaigan Games Dashboard - About'
 }, 
 { 
   path: 'admin/about/slider-carousel', 
   loadChildren: () => import('./backend/about-slider/about-slider.module').then(m => m.AboutSliderModule),
   title: 'Kaigan Games Dashboard - About Slider' 
 }, 
 { 
   path: 'admin/about/team-image', 
   loadChildren: () => import('./backend/about-team-image/about-team-image.module').then(m => m.AboutTeamImageModule),
   title: 'Kaigan Games Dashboard - Team Image'
 }, 
 { 
   path: 'admin/job-vacancy/applicant-list', 
   loadChildren: () => import('./backend/aplicant-list/aplicant-list.module').then(m => m.AplicantListModule),
   title: 'Kaigan Games Dashboard - Applicant List',
 }, 
 { 
   path: 'admin/job-vacancy/applicant-list/category', 
   loadChildren: () => import('./backend/applicant-list-category/applicant-list-category.module').then(m => m.ApplicantListCategoryModule),
   title: 'Kaigan Games Dashboard - Applicant List by Category' 
 }, 
 { 
   path: 'admin/job-vacancy/applicant-list/datetime-sort', 
   loadChildren: () => import('./backend/applicant-list-datetime/applicant-list-datetime.module').then(m => m.ApplicantListDatetimeModule),
   title: 'Kaigan Games Dashboard - Applicant List by Datetime'
 }, 
 // { path: 'admin/careers/benefits', loadChildren: () => import('./backend/benefits/benefits.module').then(m => m.BenefitsModule) },
 { 
   path: 'admin/careers/benefit-icon', 
   loadChildren: () => import('./backend/benefit-icon/benefit-icon.module').then(m => m.BenefitIconModule),
   title: 'Kaigan Games Dashboard - Benefit Icon' 
 }, 
 { 
   path: 'admin/careers/perks-and-benefit', 
   loadChildren: () => import('./backend/career-benefit-perks/career-benefit-perks.module').then(m => m.CareerBenefitPerksModule),
   title: 'Kaigan Games Dashboard - Perks and Benefits'
 }, 
 {  path: 'admin/careers/featured-job', loadChildren: () => import('./backend/career-featured-jobs/career-featured-jobs.module').then(m => m.CareerFeaturedJobsModule),
    title: 'Kaigan Games Dashboard - Featured Job'}, 
 { 
   path: 'admin/careers/group-open-position', 
   loadChildren: () => import('./backend/career-gop/career-gop.module').then(m => m.CareerGOPModule),
   title: 'Kaigan Games Dashboard - Career Group Open Position'
 },
 { 
   path: 'admin/careers/open-position', 
   loadChildren: () => import('./backend/career-op/career-op.module').then(m => m.CareerOPModule),
   title: 'Kaigan Games Dashboard - Career Open Position'
 },
 { 
   path: 'admin/careers/life-at-kaigan', 
   loadChildren: () => import('./backend/career-life-at-kaigan/career-life-at-kaigan.module').then(m => m.CareerLifeAtKaiganModule), 
   title: 'Kaigan Games Dashboard - Life at Kaigan'
 },
 { 
   path: 'admin/community-highlights', 
   loadChildren: () => import('./backend/community-highlights-backend/community-highlights-backend.module').then(m => m.CommunityHighlightsBackendModule),
   title: 'Kaigan Games Dashboard - Community Highlights'
 },
 { 
   path: 'admin/community-highlight/section', 
   loadChildren: () => import('./backend/community-highlights-section/community-highlights-section.module').then(m => m.CommunityHighlightsSectionModule),
   title: 'Kaigan Games Dashboard - Community Highlight Section'
 },
 { 
   path: 'admin/community', 
   loadChildren: () => import('./backend/community-page/community-page.module').then(m => m.CommunityPageModule),
   title: 'Kaigan Games Dashboard - Community'
 },
 { 
   path: 'admin/contact-us', 
   loadChildren: () => import('./backend/contact-us-list/contact-us-list.module').then(m => m.ContactUsListModule),
   title: 'Kaigan Games Dashboard - Contact Us'
 },
 { 
   path: 'admin/dashboard', 
   loadChildren: () => import('./backend/dashboard/dashboard.module').then(m => m.DashboardModule),
   title: 'Kaigan Games Dashboard'
 },
 { 
   path: 'admin/dev-blog-tabs', 
   loadChildren: () => import('./backend/dev-blog-tabs/dev-blog-tabs.module').then(m => m.DevBlogTabsModule),
   title: 'Kaigan Games Dashboard - Dev Blog Tabs'
 },
 { 
   path: 'admin/dev-blog', 
   loadChildren: () => import('./backend/dev-blog-backend/dev-blog-backend.module').then(m => m.DevBlogBackendModule),
   title: 'Kaigan Games Dashboard - Dev Blog'
 },
 { 
   path: 'admin/games/faq', 
   loadChildren: () => import('./backend/game-faqs/game-faqs.module').then(m => m.GameFaqsModule),
   title: 'Kaigan Games Dashboard - Game FAQs'
 },
 { 
   path: 'admin/games/list', 
   loadChildren: () => import('./backend/game-list/game-list.module').then(m => m.GameListModule),
   title: 'Kaigan Games Dashboard - Game Lists'
  },
 { 
   path: 'admin/games/video', 
   loadChildren: () => import('./backend/game-video/game-video.module').then(m => m.GameVideoModule),
   title: 'Kaigan Games Dashboard - Game Videos'
 },
 // { 
 //   path: 'career/internship-program', 
 //   loadChildren: () => import('./backend/internship-program/internship-program.module').then(m => m.InternshipProgramModule),
 //   title: 'Kaigan Games - Internship Program'
 // },
//  { 
//    path: 'admin/internship/perks', 
//    loadChildren: () => import('./backend/internship-program-perks/internship-program-perks.module').then(m => m.InternshipProgramPerksModule),
//    title: 'Kaigan Games Dashboard - Internship Perks'
//  },
 { 
   path: 'admin/internship/slider', 
   loadChildren: () => import('./backend/internship-program-slider/internship-program-slider.module').then(m => m.InternshipProgramSliderModule),
   title: 'Kaigan Games Dashboard - Internship Slider'
 },
 { 
   path: 'admin/press', 
   loadChildren: () => import('./backend/press-backend/press-backend.module').then(m => m.PressBackendModule),
   title: 'Kaigan Games Dashboard - Press'
 },
 { 
   path: 'admin/user-profile', 
   loadChildren: () => import('./backend/profile/profile.module').then(m => m.ProfileModule),
   title: 'Kaigan Games Dashboard - User Profile'
 },
 { 
   path: 'admin/header/slider-carousel', 
   loadChildren: () => import('./backend/slider-carousel/slider-carousel.module').then(m => m.SliderCarouselModule),
   title: 'Kaigan Games Dashboard - Header Slider Carousel'
 },
 { 
   path: 'admin/testimonials', 
   loadChildren: () => import('./backend/testimonial-page/testimonial-page.module').then(m => m.TestimonialPageModule),
   title: 'Kaigan Games Dashboard - Testimonials'
 },
 { 
   path: '**', 
   loadChildren: () => import('./frontend/pages/not-found/not-found.module').then(m => m.NotFoundModule),
   title: 'Sorry, Page Not Found!'
 }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
