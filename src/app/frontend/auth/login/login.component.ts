import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { faEyeSlash, faEye, faCog} from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  show = false;
  password: any;

  faEyeSlash = faEyeSlash;
  faEye = faEye;
  faCog = faCog;

  constructor(private authService: AuthService, 
    private storageService: TokenStorageService, 
    private toastService: ToastNotificationService,
    private router: Router){}

  ngOnInit(): void {
    this.password = 'password';
    //check token
    if(this.storageService.isLoggedIn()){
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.router.navigate(['admin/dashboard']);
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
    }), $(".close-switcher").on("click", function() {
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
    const {username, password} = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        //save user data
        this.storageService.saveUser(data);
        //change status
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        //save roles
        this.roles = this.storageService.getUser().roles;
        this.showToasterSuccess();
        console.log('login granted!');
        
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.showToasterError(this.errorMessage)
      }
    })
  }

  showToasterSuccess(){
    this.toastService.showSuccess("Login successfully. You will be redirected in few second.", "Success");
    setTimeout(() => {
      this.router.navigate(['admin/dashboard']);
    }, 2000);
  }

  showToasterError(message: any){
    this.toastService.showError(message, "Error")
  }

  reloadPage(){
    window.location.reload();   
  }

  toggleFieldTextType(){
    console.log(this.password);

    let cehck = $("#show_hide_password").is('input[type="password"]')
    console.log(' check', cehck);
    
    
    // if (this.password === 'password') {
    //   this.password = 'text';
    //   this.show = true;
    // } else {
    //   this.password = 'password';
    //   this.show = false;
    // }
  }
}
