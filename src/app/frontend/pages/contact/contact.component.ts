import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from "../../../services/backend.service";
import { ToastNotificationService } from '../../../services/toast-notification.service';
import { ContactUs } from "../../../models/backend/contact-us.model";
import * as AOS from 'aos';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent {
   //form
  ContactUs: ContactUs = {
    name: '',
    email: '',
    website: '',
    message: '',
    createdAt: ''
  };
  
  token: any;

  constructor(private backendService: BackendService, private toastService: ToastNotificationService, private ngxFavicon: AngularFaviconService){
    $('body').removeClass("bg-theme2");
    this.token = undefined;
  }

  ngOnInit() {
    AOS.init();
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }
    const data = {
      name: this.ContactUs.name,
      email: this.ContactUs.email,
      website: this.ContactUs.website,
      message: this.ContactUs.message
    };
    
    this.backendService.create_ContactUS(data)
      .subscribe({
        next: (res) => {
          let message = "Thank you for contacting Us";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });

    console.debug(`Token [${this.token}] generated`);
  }

  showToasterSuccess(msg: string | undefined){
    this.toastService.showSuccess(msg, "Success");
    setTimeout(() => {
      this.reload()
    }, 2500);
  }

  reload(): void{
    location.reload()
  }
}
