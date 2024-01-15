import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { faEyeSlash, faEye, faCog} from '@fortawesome/free-solid-svg-icons'; 
import { ToastNotificationService } from '../../../services/toast-notification.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  faCog = faCog;
  isLoggedIn = false;

  constructor(private authService: AuthService,  private toastService: ToastNotificationService, private router: Router, private storageService: TokenStorageService) { }

  ngOnInit(): void {
    //check token
    if(this.storageService.isLoggedIn()){
      this.isLoggedIn = true;
    } else {
      this.router.navigate(['sign-in'])
    }

    //jquery switcher
    $("#show_hide_password a").on('click', function (event) {
      event.preventDefault();
      if ($('#show_hide_password input').attr("type") == "text") {
        $('#show_hide_password input').attr('type', 'password');
        $('#show_hide_password i').addClass("bx-hide");
        $('#show_hide_password i').removeClass("bx-show");
      } else if ($('#show_hide_password input').attr("type") == "password") {
        $('#show_hide_password input').attr('type', 'text');
        $('#show_hide_password i').removeClass("bx-hide");
        $('#show_hide_password i').addClass("bx-show");
      }
    });

    $(".switcher-btn").on("click", function() {
      $(".switcher-wrapper").toggleClass("switcher-toggled")
    }), 
    $(".close-switcher").on("click", function() {
      $(".switcher-wrapper").removeClass("switcher-toggled")
    }),
    
    $('#theme1').click(theme1);
    $('#theme2').click(theme2);
    $('#theme3').click(theme3);
    $('#theme4').click(theme4);
    $('#theme5').click(theme5);
    $('#theme6').click(theme6);
    $('#theme7').click(theme7);
    $('#theme8').click(theme8);
    $('#theme9').click(theme9);
    $('#theme10').click(theme10);
    $('#theme11').click(theme11);
    $('#theme12').click(theme12);
    $('#theme13').click(theme13);
    $('#theme14').click(theme14);
    $('#theme15').click(theme15);
  
    function theme1() {
      $('body').attr('class', 'bg-theme bg-theme1');
    }
  
    function theme2() {
      $('body').attr('class', 'bg-theme bg-theme2');
    }
  
    function theme3() {
      $('body').attr('class', 'bg-theme bg-theme3');
    }
  
    function theme4() {
      $('body').attr('class', 'bg-theme bg-theme4');
    }
  
    function theme5() {
      $('body').attr('class', 'bg-theme bg-theme5');
    }
  
    function theme6() {
      $('body').attr('class', 'bg-theme bg-theme6');
    }
  
    function theme7() {
      $('body').attr('class', 'bg-theme bg-theme7');
    }
  
    function theme8() {
      $('body').attr('class', 'bg-theme bg-theme8');
    }
  
    function theme9() {
      $('body').attr('class', 'bg-theme bg-theme9');
    }
  
    function theme10() {
      $('body').attr('class', 'bg-theme bg-theme10');
    }
  
    function theme11() {
      $('body').attr('class', 'bg-theme bg-theme11');
    }
  
    function theme12() {
      $('body').attr('class', 'bg-theme bg-theme12');
    }
  
    function theme13() {
      $('body').attr('class', 'bg-theme bg-theme13');
    }
  
    function theme14() {
      $('body').attr('class', 'bg-theme bg-theme14');
    }
  
    function theme15() {
      $('body').attr('class', 'bg-theme bg-theme15');
    }
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe({
      next: data => {
        // console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showToasterSuccess();
        setTimeout(() => {
          // this.reloadPage();
          this.router.navigate(['sign-in'])
        }, 3000);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.errorMessage = err.error.message;
        if(this.errorMessage == "You can't using this username, because the username is already in use!"){
          this.showToasterWarning("You can't using this username, because the username is already in use!")
        } else if(this.errorMessage == "Please use another email. Email is already in use!"){
          this.showToasterWarning("Please use another email. Email is already in use!")
        } else if(this.errorMessage == "Unable to validate Username!"){
          this.showToasterWarning("Unable to validate Username!")
        } else {
          this.showToasterError();
        }
        this.isSignUpFailed = true;
      }
    });
  }

  showToasterSuccess(){
    this.toastService.showSuccess("Your registration is successful!", "Success")
  }
  
  showToasterError(){
    this.toastService.showError("Something is wrong", "Error")
  }
  
  showToasterWarning(message: any){
    this.toastService.showWarning(message, "Warning")
  }
}
