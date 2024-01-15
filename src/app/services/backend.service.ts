import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

//models
import { About } from "../models/backend/about.model";
import { CareerBenefitPerks } from "../models/backend/career-benefit-perks.model";
import { CareerFeaturedJob } from "../models/backend/career-featured-job.model";
import { CareerGroupOpenPosition } from "../models/backend/career-group-open-position.model";
import { CareerOpenPosition } from "../models/backend/career-open-position.model";
import { CareerLifeAtKaigan } from "../models/backend/career-life-at-kaigan.model";
import { ContactUs } from "../models/backend/contact-us.model";
import { GameList } from "../models/backend/game-list.model"
import { GameVideo } from "../models/backend/game-video.model";
import { GameFaq } from "../models/backend/game-faq.model";
import { JobApplication } from "../models/backend/job-application.model";
import { HeaderSlider } from "../models/backend/header-slider.model";
import { AboutSlider } from "../models/backend/about-slider.model";
import { AboutTeamImage } from "../models/backend/about-team-image.model";
import { User } from "../models/backend/user.model";
import { Community } from "../models/backend/community.model";
import { InternshipPerks } from "../models/backend/internship-perks.model";
import { InternshipSlider } from "../models/backend/internship-slider.model";
import { Testimonials } from '../models/backend/testimonials.model';
import { BenefitIcon } from '../models/backend/benefit-icon.model';
import { CommunityHighlights } from '../models/backend/community-highlights.model';
import { CommunityHighlightSection } from '../models/backend/community-highlight-section.model';
import { Press } from '../models/backend/press.model';
import { DevBlog } from '../models/backend/dev-blog.model';
import { DevBlogTab } from '../models/backend/dev-blog-tab.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private BASE_API = 'https://new-rest.kaigangames.com/api';
  // private BASE_API = 'http://localhost:3000/api';
  // private BASE_API = 'https://rest.kaigangames.com/api'

  constructor(private http: HttpClient) {}  

  //dashboard
  get_User(): Observable<User[]>{
    return this.http.get<User[]>(`${this.BASE_API}/user-data`);
  }
  current_User(id: any): Observable<User>{
    return this.http.get<User>(`${this.BASE_API}/user-data/${id}`);
  }
  update_UserData(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/user-data/update/${id}`, data);
  }

  //header slider
  create_HeaderSlider(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/header-slide/create-data`, data);
  }
  uploadHeaderSlider(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.BASE_API}/header-slide/upload-image`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  get_HeaderSlider(): Observable<HeaderSlider[]>{
    return this.http.get<HeaderSlider[]>(`${this.BASE_API}/header-slide`);
  }
  delete_HeaderSlide(id: any, image: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/header-slide/delete/${id}/${image}`)
  }

  //about
  createAbout(data: any): Observable<any> {
    return this.http.post(`${this.BASE_API}/about/create-data`, data);
  }
  getAllAbout(): Observable<About[]> {
    return this.http.get<About[]>(`${this.BASE_API}/about`);
  }
  deteleAbout(id: any): Observable<any> {
    return this.http.delete(`${this.BASE_API}/about/delete/${id}`);
  }

  //about slider
  create_AboutSlider(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/about-slide/create-data`, data);
  }
  uploadAboutSlider(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.BASE_API}/about-slide/upload-image`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  get_AboutSlider(): Observable<AboutSlider[]>{
    return this.http.get<AboutSlider[]>(`${this.BASE_API}/about-slide`);
  }
  delete_AboutSlider(id: any, image: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/about-slide/delete/${id}/${image}`)
  }

  //about team image
  create_AboutTeamImage(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/about-team-image/create-data`, data);
  }
  uploadAboutTeamImage(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.BASE_API}/about-team-image/upload-image`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  get_AboutTeamImage(): Observable<AboutTeamImage[]>{
    return this.http.get<AboutTeamImage[]>(`${this.BASE_API}/about-team-image`);
  }
  delete_AboutTeamImage(id: any, image: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/about-team-image/delete/${id}/${image}`)
  }

  //Careers
  //-----------------
  //Benefit and Perks
  create_BenefitPerks(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/career/benefit-and-perks/create-data`, data);
  }
  get_BenefitPerks(): Observable<CareerBenefitPerks[]>{
    return this.http.get<CareerBenefitPerks[]>(`${this.BASE_API}/career/benefit-and-perks`);
  }
  edit_BenefitPerks(id: any): Observable<CareerBenefitPerks>{
    return this.http.get<CareerBenefitPerks>(`${this.BASE_API}/career/benefit-and-perks/edit/${id}`);
  }
  update_BenefitPerks(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/career/benefit-and-perks/update/${id}`, data);
  }
  delete_BenefitPerks(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/career/benefit-and-perks/delete/${id}`);
  }
  //benefit icon
  create_BenefitIcon(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/career/benefit-icon/create-data`, data);
  }
  uploadBenefitIcon(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.BASE_API}/career/benefit-icon/upload-image`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  uploadBenefitIconHover(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.BASE_API}/career/benefit-icon/upload-image/hover`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  get_benefitIconInfo(): Observable<any> {
    return this.http.get(`${this.BASE_API}/career/benefit-icon/get-image/normal`);
  }
  get_benefitIconHoverInfo(): Observable<any> {
    return this.http.get(`${this.BASE_API}/career/benefit-icon/get-image/hover`);
  }
  get_BenefitIcon(): Observable<BenefitIcon[]>{
    return this.http.get<BenefitIcon[]>(`${this.BASE_API}/career/benefit-icon`);
  }
  delete_BenefitIcon(id: any, icon: any, iconHover: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/career/benefit-icon/delete/${id}/${icon}/${iconHover}`);
  }
  //--------------------------------------------------------------------------------------

  //Featured Jobs
  create_FeaturedJob(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/career/featured-job/create-data`, data);
  }
  uploadFeaturedJob(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.BASE_API}/career/featured-job/upload-image`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  get_FeaturedJob(): Observable<CareerFeaturedJob[]>{
    return this.http.get<CareerFeaturedJob[]>(`${this.BASE_API}/career/featured-job`);
  }
  edit_FeaturedJob(id: any): Observable<CareerFeaturedJob>{
    return this.http.get<CareerFeaturedJob>(`${this.BASE_API}/career/featured-job/edit/${id}`)
  }
  update_FeaturedJob(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/career/featured-job/update/${id}`, data);
  }
  delete_FeaturedJob(id: any, image: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/career/featured-job/delete/${id}/${image}`);
  }

  //---------------------------------------------------------------------------------------

  //Group Open Position
  create_GroupOpenPosition(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/career/group-open-position/create-data`, data);
  }
  get_GroupOpenPosition(): Observable<CareerGroupOpenPosition[]>{
    return this.http.get<CareerGroupOpenPosition[]>(`${this.BASE_API}/career/group-open-position`);
  }
  edit_GroupOpenPosition(id: any): Observable<CareerGroupOpenPosition>{
    return this.http.get<CareerGroupOpenPosition>(`${this.BASE_API}/career/group-open-position/edit/${id}`)
  }
  update_GroupOpenPosition(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/career/group-open-position/update/${id}`, data);
  }
  delete_GroupOpenPosition(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/career/group-open-position/delete/${id}`);
  }

  //----------------------------------------------------------------------------------------

  //Open Position
  create_OpenPosition(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/career/open-position/create-data`, data);
  }
  get_OpenPosition(): Observable<CareerOpenPosition[]>{
    return this.http.get<CareerOpenPosition[]>(`${this.BASE_API}/career/open-position`);
  }
  edit_OpenPosition(id: any): Observable<CareerOpenPosition>{
    return this.http.get<CareerOpenPosition>(`${this.BASE_API}/career/open-position/edit/${id}`)
  }
  update_OpenPosition(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/career/open-position/update/${id}`, data);
  }
  delete_OpenPosition(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/career/open-position/delete/${id}`);
  }

  //----------------------------------------------------------------------------------------

  //Life at Kaigan Games
  create_CareerLifeAtKaigan(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/career/life-at-kaigan/create-data`, data);
  }
  uploadCareerLifeAtKaigan(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.BASE_API}/career/life-at-kaigan/upload-image`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  get_CareerLifeAtKaigan(): Observable<CareerLifeAtKaigan[]>{
    return this.http.get<CareerLifeAtKaigan[]>(`${this.BASE_API}/career/life-at-kaigan`);
  }
  delete_CareerLifeAtKaigan(id: any, image: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/career/life-at-kaigan/delete/${id}/${image}`);
  }

  //Job Application
  send_JobApplication(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/job-application/job-apply`, data);
  }
  uploadResumeFile(file: File, filename: any): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file, filename);

    const req = new HttpRequest('POST', `${this.BASE_API}/job-application/upload-resume`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  getResumeFile(): Observable<any> {
    return this.http.get(`${this.BASE_API}/job-application/get-files`);
  }
  get_JobApplication(): Observable<JobApplication[]>{
    return this.http.get<JobApplication[]>(`${this.BASE_API}/job-application`);
  }
  detail_JobApplication(id: any): Observable<JobApplication>{
    return this.http.get<JobApplication>(`${this.BASE_API}/job-application/edit/${id}`)
  }
  downloadResumeFile(resume_file:any): Observable<any>{
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get(`${this.BASE_API}/job-application/download/${resume_file}`, httpOptions)
  }
  delete_JobApplication(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/job-application/delete/${id}`)
  }
  //zip file operation
  checkZIP_JobApplication(): Observable<any>{
    return this.http.get(`${this.BASE_API}/job-application/check/zip`);
  }
  generateZIP_JobApplication():Observable<any>{
    return this.http.get(`${this.BASE_API}/job-application/generate-zip`);
  }
  downloadZIP_JobApplication(){
    return this.http.get(`${this.BASE_API}/job-application/download-zip`, {responseType: 'blob'});
  }
  deleteZIP_JobApplication(zipname: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/job-application/delete/zip/${zipname}`)
  }
  betweenDate_JobApplication(start: any, end: any): Observable<any> {
    return this.http.get(`${this.BASE_API}/job-application/data/${start}/${end}`)
  }
  //by group open position
  checkZIPByGroupOpenPosition(): Observable<any>{
    return this.http.get(`${this.BASE_API}/job-application/group-open-position/check/zip`);
  }
  getDataByGroupOpenPosition(GOP: any): Observable<any>{
    return this.http.get(`${this.BASE_API}/job-application/data/${GOP}`)
  }
  generateZIPByGroupOpenPosition(GOP: any): Observable<any>{
    return this.http.get(`${this.BASE_API}/job-application/generate-zip/by/group-open-position/${GOP}`)
  }
  downloadZIPByGroupOpenPosition(){
    return this.http.get(`${this.BASE_API}/job-application/download-zip/by/group-open-position/`, {responseType: 'blob'});
  }
  deleteZIPByGroupOpenPosition(zipname: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/job-application/delete-zip/by/group-open-position/${zipname}`)
  }

  //Game List
  create_GameList(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/game/game-list/create-data`, data);
  }
  uploadGameImage(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.BASE_API}/game/game-list/upload-image`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  getGameImage(): Observable<any> {
    return this.http.get(`${this.BASE_API}/game/game-list/get-image`);
  }
  getGameListByParams(start: any, end: any): Observable<any> {
    return this.http.get(`${this.BASE_API}/game/game-list/${start}/${end}`);
  }
  getCurrentGameImage(id: any): Observable<GameList>{
    return this.http.get<GameList>(`${this.BASE_API}/game/game-list/edit/${id}`)
  }
  get_GameList(): Observable<GameList[]>{
    return this.http.get<GameList[]>(`${this.BASE_API}/game/game-list`);
  }
  edit_GameList(id: any): Observable<GameList>{
    return this.http.get<GameList>(`${this.BASE_API}/game/game-list/edit/${id}`)
  }
  update_GameList(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/game/game-list/update/${id}`, data);
  }
  delete_GameList(id: any, game_image: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/game/game-list/delete/${id}/${game_image}`)
  }

  //Game Video
  create_GameVideo(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/game/game-video/create-data`, data);
  }
  get_GameVideo(): Observable<GameVideo[]>{
    return this.http.get<GameVideo[]>(`${this.BASE_API}/game/game-video`);
  }
  edit_GameVideo(id: any): Observable<GameVideo>{
    return this.http.get<GameVideo>(`${this.BASE_API}/game/game-video/edit/${id}`)
  }
  update_GameVideo(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/game/game-video/update/${id}`, data);
  }
  delete_GameVideo(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/game/game-video/delete/${id}`)
  }

  //Game FAQ
  create_GameFAQ(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/game/game-faq/create-data`, data);
  }
  get_GameFAQ(): Observable<GameFaq[]>{
    return this.http.get<GameFaq[]>(`${this.BASE_API}/game/game-faq`);
  }
  edit_GameFAQ(id: any): Observable<GameFaq>{
    return this.http.get<GameFaq>(`${this.BASE_API}/game/game-faq/edit/${id}`)
  }
  update_GameFAQ(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/game/game-faq/update/${id}`, data);
  }
  delete_GameFAQ(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/game/game-faq/delete/${id}`)
  }

  //Contact US
  create_ContactUS(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/contact-us/create-data`, data);
  }
  get_ContactUS(): Observable<ContactUs[]>{
    return this.http.get<ContactUs[]>(`${this.BASE_API}/contact-us`);
  }
  delete_ContactUS(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/contact-us/delete/${id}`);
  }

  //Community
  create_Community(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/community/create-data`, data);
  }
  get_communityImageList(): Observable<any> {
    return this.http.get(`${this.BASE_API}/community/get-image`);
  }
  get_communityDetail(id: any): Observable<Community>{
    return this.http.get<Community>(`${this.BASE_API}/community/detail/${id}`)
  }
  upload_CommunityImage(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.BASE_API}/community/upload-image`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  get_communityImage(): Observable<any> {
    return this.http.get(`${this.BASE_API}/community/get-image`);
  }
  get_Community(): Observable<Community[]>{
    return this.http.get<Community[]>(`${this.BASE_API}/community`);
  }
  detail_Community(month: any): Observable<Community[]>{
    return this.http.get<Community[]>(`${this.BASE_API}/community/by/${month}`);
  }
  edit_Community(id: any): Observable<Community>{
    return this.http.get<Community>(`${this.BASE_API}/community/edit/${id}`)
  }
  update_Community(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/community/update/${id}`, data);
  }
  delete_Community(id: any, community_image: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/community/delete/${id}/${community_image}`)
  }
  delete_communityImage(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/community/image/delete/${id}`)
  }

  //community Highlights
  create_CommunityHighlight(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/community/highlight/create-data`, data);
  }
  get_communityHighlightImageList(): Observable<any> {
    return this.http.get(`${this.BASE_API}/community/highlight/get-image`);
  }
  upload_CommunityHighlightImage(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.BASE_API}/community/highlight/upload-image`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  get_communityHighlightImage(): Observable<any> {
    return this.http.get(`${this.BASE_API}/community/highlight/get-image`);
  }
  get_communityHighlight(): Observable<CommunityHighlights[]>{
    return this.http.get<CommunityHighlights[]>(`${this.BASE_API}/community/highlight`);
  }
  detail_CommunityHighlight(month: any): Observable<CommunityHighlights[]>{
    return this.http.get<CommunityHighlights[]>(`${this.BASE_API}/community/highlight/detail/${month}`)
  }
  edit_CommunityHighlight(id: any): Observable<CommunityHighlights>{
    return this.http.get<CommunityHighlights>(`${this.BASE_API}/community/highlight/edit/${id}`)
  }
  update_CommunityHighlight(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/community/highlight/update/${id}`, data);
  }
  delete_CommunityHighlight(id: any, community_image: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/community/highlight/delete/${id}/${community_image}`)
  }
  delete_communityHighlightImage(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/community/highlight/image/delete/${id}`)
  }

  //community highlight section
  create_CommunityHighlightSection(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/community/highlight-section/create-data`, data);
  }
  get_CommunityHighlightSection(): Observable<CommunityHighlightSection[]>{
    return this.http.get<CommunityHighlightSection[]>(`${this.BASE_API}/community/highlight-section`)
  }
  edit_CommunityHighlightSection(id: any): Observable<CommunityHighlightSection>{
    return this.http.get<CommunityHighlightSection>(`${this.BASE_API}/community/highlight-section/edit/${id}`)
  }
  detail_CommunityHighlightSection(id: any): Observable<CommunityHighlightSection[]>{
    return this.http.get<CommunityHighlightSection[]>(`${this.BASE_API}/community/highlight-section/detail/${id}`)
  }
  update_CommunityHighlightSection(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/community/highlight-section/update/${id}`, data);
  }
  delete_CommunityHighlightSection(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/community/highlight-section/delete/${id}`)
  }

  //internship perks
  create_internshipPerks(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/internship/perks/create-data`, data);
  }
  get_internshipPerksImageList(): Observable<any> {
    return this.http.get(`${this.BASE_API}/internship/perks/get-image`);
  }
  upload_internshipPerksImage(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.BASE_API}/internship/perks/upload-image`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  get_internshipPerks(): Observable<InternshipPerks[]>{
    return this.http.get<InternshipPerks[]>(`${this.BASE_API}/internship/perks`);
  }
  edit_internshipPerks(id: any): Observable<InternshipPerks>{
    return this.http.get<InternshipPerks>(`${this.BASE_API}/internship/perks/edit/${id}`)
  }
  update_internshipPerks(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/internship/perks/update/${id}`, data);
  }
  delete_internshipPerks(id: any, perks_image: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/internship/perks/delete/${id}/${perks_image}`)
  }
  delete_internshipPerksImage(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/internship/perks/image/delete/${id}`)
  }

  //internship slider
  create_internshipSlider(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/internship/slider/create-data`, data);
  }
  get_internshipSliderImageList(): Observable<any> {
    return this.http.get(`${this.BASE_API}/internship/slider/get-image`);
  }
  upload_internshipSliderImage(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.BASE_API}/internship/slider/upload-image`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  get_internshipSlider(): Observable<InternshipSlider[]>{
    return this.http.get<InternshipSlider[]>(`${this.BASE_API}/internship/slider`);
  }
  delete_internshipSlider(id: any, slider_image: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/internship/slider/delete/${id}/${slider_image}`)
  }

  //testimonial
  create_Testimonial(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/testimonial/create-data`, data);
  }
  upload_TestimonialClientImage(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.BASE_API}/testimonial/client/upload-image`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  upload_TestimonialUserImage(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.BASE_API}/testimonial/user/upload-image`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  get_testimonials(): Observable<Testimonials[]>{
    return this.http.get<Testimonials[]>(`${this.BASE_API}/testimonial`);
  }
  get_testimonialsByParams(start: any, end: any): Observable<Testimonials[]> {
    return this.http.get<Testimonials[]>(`${this.BASE_API}/testimonial/${start}/${end}`);
  }
  get_testimonialClientImageInfo(): Observable<any> {
    return this.http.get(`${this.BASE_API}/testimonial/client/get-image`);
  }
  get_testimonialUserImageInfo(): Observable<any> {
    return this.http.get(`${this.BASE_API}/testimonial/user/get-image`);
  }
  edit_testimonial(id: any): Observable<Testimonials>{
    return this.http.get<Testimonials>(`${this.BASE_API}/testimonial/edit/${id}`)
  }
  update_testimonial(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/testimonial/update/${id}`, data);
  }
  delete_testimonialClientImage(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/testimonial/client/image/delete/${id}`)
  }
  delete_testimonialUserImage(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/testimonial/user/image/delete/${id}`)
  }
  delete_testimonial(id: any, client_image: any, user_image: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/testimonial/delete/${id}/${client_image}/${user_image}`)
  }

  //profile
  checkPassword(id: any, password: any): Observable<User>{
    return this.http.get<User>(`${this.BASE_API}/profile/check-password/${id}/${password}`);
  }

  //press
  create_Press(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/press/create-data`, data);
  }
  get_press(): Observable<Press[]>{
    return this.http.get<Press[]>(`${this.BASE_API}/press`);
  }
  edit_press(id: any): Observable<Press>{
    return this.http.get<Press>(`${this.BASE_API}/press/edit/${id}`)
  }
  update_press(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/press/update/${id}`, data);
  }
  delete_press(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/press/delete/${id}`)
  }

  //search
  news_search(keywords: any, searchby: any): Observable<Press[]>{
    return this.http.get<Press[]>(`${this.BASE_API}/press/search/${keywords}/by/${searchby}`)
  }

  //dev blog
  create_devBlog(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/dev-blog/create-data`, data);
  }
  get_devBlog(): Observable<DevBlog[]>{
    return this.http.get<DevBlog[]>(`${this.BASE_API}/dev-blog`);
  }
  get_devBlogDetail(id: any): Observable<DevBlog[]>{
    return this.http.get<DevBlog[]>(`${this.BASE_API}/dev-blog/detail/${id}`)
  }
  get_devBlogArticleDetail(slug: any): Observable<DevBlog[]>{
    return this.http.get<DevBlog[]>(`${this.BASE_API}/dev-blog/detail/article/${slug}`)
  }
  edit_devBlog(id: any): Observable<DevBlog>{
    return this.http.get<DevBlog>(`${this.BASE_API}/dev-blog/edit/${id}`)
  }
  update_devBlog(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/dev-blog/update/${id}`, data);
  }
  delete_devBlog(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/dev-blog/delete/${id}`)
  }

  //dev blog tab
  create_devBlogTab(data: any): Observable<any>{
    return this.http.post(`${this.BASE_API}/dev-blog/tab/create-data`, data);
  }
  get_devBlogTab(): Observable<DevBlogTab[]>{
    return this.http.get<DevBlogTab[]>(`${this.BASE_API}/dev-blog/tab`);
  }
  get_devBlogTabDetail(id: any): Observable<DevBlogTab>{
    return this.http.get<DevBlogTab>(`${this.BASE_API}/dev-blog/tab/detail/${id}`)
  }
  edit_devBlogTab(id: any): Observable<DevBlogTab>{
    return this.http.get<DevBlogTab>(`${this.BASE_API}/dev-blog/tab/edit/${id}`)
  }
  update_devBlogTab(id: any, data: any): Observable<any>{
    return this.http.put(`${this.BASE_API}/dev-blog/tab/update/${id}`, data);
  }
  delete_devBlogTab(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_API}/dev-blog/tab/delete/${id}`)
  }
}