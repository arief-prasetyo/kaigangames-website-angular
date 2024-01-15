import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
//services
import { TokenStorageService } from '../../services/token-storage.service';
import { BackendService } from "../../services/backend.service";
import { ToastNotificationService } from '../../services/toast-notification.service';
//model
import { GameList } from "../../models/backend/game-list.model";
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt, faSearch} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.sass']
})
export class GameListComponent {
  editGameListForm: GameList = new GameList();

  //fontawesome
  faCog = faCog;
  faSlider = faSlideshare;
  faChevronRight =faChevronRight;
  faMoneyBillWave = faMoneyBillWave;
  faPlusCircle = faPlusCircle;
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faHomeAlt= faHomeAlt;
  faSearch = faSearch;
  //form
  gameList: GameList = {
    game_name: '',
    game_image: '',
    game_description: '',
    game_platform: '',
    game_year: '',
    game_rating: '',
    esrb_rating: '',
    pegi_rating: '',
    pegi_cd: '',
    media: '',
    URI: '',
    image_path: '',
    createdAt: ''
  };
  submitted = false;
  gameListData?: GameList[];
  tagItems = [];
  //edit data
  id?: number;
  //login check
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  //game image
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  imageInfos?: Observable<any>;

  constructor(private backendService: BackendService,
    private storageService: TokenStorageService, 
    private router: Router, 
    private toastService: ToastNotificationService,
    private ngxFavicon: AngularFaviconService){}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');

    if (this.isLoggedIn) {
      // const user = this.storageService.getUser();
    } else {
      this.router.navigate(['sign-in'])
    }

    //then load data
    this.retrieveGameList();
    this.imageInfos = this.backendService.getGameImage();

    //append esrb and pegi rating
    $('#game_rating, #game_rating_edit').on('change', function(){
      var ratingValue = $(this).val();
      if(ratingValue == 'ESRB'){
        $("#esrb-rating").css('display', 'block')
        $("#pegi-rating").css('display', 'none')
      } else {
        $("#esrb-rating").css('display', 'none')
        $("#pegi-rating").css('display', 'block')
      }
    });

    //append pegi content descriptor
    $('#game_rating, #game_rating_edit').on('change', function(){
      var ratingValue = $(this).val();
      if(ratingValue == 'ESRB'){
        $('#pegi-content-descriptor').css('display', 'none')
      }
      else {
        $('#pegi-content-descriptor').css('display', 'block')
      }
    });
  }

  retrieveGameList(): void{
    this.backendService.get_GameList().subscribe({
      next: (data) => {
        this.gameListData = data;
        
        setTimeout(()=>{   
          $('#datatableGameList').DataTable( {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu : [5, 10, 25, 50],
            retrieve: true,
          });
        }, 1);
      },
      error: (e) => console.error(e)
    })
  }

  editData(id: any): void{
    this.backendService.edit_GameList(id).subscribe((data) => {
      this.editGameListForm.game_image = data.game_image;
      this.editGameListForm.game_name = data.game_name;
      this.editGameListForm.game_description = data.game_description;
      this.editGameListForm.game_year = data.game_year;
      this.editGameListForm.game_platform = data.game_platform;
      this.editGameListForm.game_rating = data.game_rating;
      this.editGameListForm.esrb_rating = data.esrb_rating;
      this.editGameListForm.pegi_rating = data.game_name;
      this.editGameListForm.pegi_cd = data.pegi_cd;
      this.editGameListForm.media = data.media;
      this.editGameListForm.URI = data.URI;
      this.editGameListForm.image_path = data.image_path;
      this.editGameListForm.createdAt = data.createdAt;

      this.id = data.id
    })
  }

  onSubmit(): void {    
    //game platform
    let joinPlatform = this.gameList.game_platform;
    let platformLength = joinPlatform.length;
    const platformArr = [];
    //split array data
    for (let i = 0; i < platformLength; i++) {
      //get only the value
      let arrayValue = joinPlatform[i].value;
      //push data as one array
      platformArr.push(arrayValue)
    }
    //then join the array
    let joinPlatformArr = platformArr.join(', ');
    
    //PEGI Content Descriptor
    let pegiCD = this.gameList.pegi_cd;
    let pegiCDLength = pegiCD.length;
    const pegiCDArr = [];
    for (let i = 0; i < pegiCDLength; i++) {
      let pegiCDVal = pegiCD[i];
      pegiCDArr.push(pegiCDVal);
      
    }
    let joinPegiCD = pegiCDArr.join(', ');
    //game image remove fakepath
    let img = this.gameList.game_image;
    let imgName = img.replace("C:\\fakepath\\", "");
  
    const data = {
      game_name: this.gameList.game_name,
      game_platform: joinPlatformArr,
      game_year: this.gameList.game_year,
      game_rating: this.gameList.game_rating,
      esrb_rating: this.gameList.esrb_rating,
      pegi_rating: this.gameList.pegi_rating,
      pegi_cd: joinPegiCD,
      game_description: this.gameList.game_description,
      game_image: this.gameList.game_image,
      media: this.gameList.media,
      image_path: '/assets/resources/uploads/games/'+imgName,
      URI: this.gameList.URI,
    };

    this.backendService.create_GameList(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;

          let message = "Successfully Create Game Data.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });
    this.uploadImage();
    this.clearField();
    
  }

  updateData(id: any): void{
    const editData = {
      game_name: this.editGameListForm.game_name,
      game_image:  this.editGameListForm.game_image,
      game_description: this.editGameListForm.game_description ,
      game_platform: this.editGameListForm.game_platform,
      game_year: this.editGameListForm.game_year,
      game_rating: this.editGameListForm.game_rating,
      esrb_rating: this.editGameListForm.esrb_rating,
      pegi_rating: this.editGameListForm.pegi_rating,
      pegi_cd: this.editGameListForm.pegi_cd,
      media: this.editGameListForm.media,
      image_path: '/assets/resources/uploads/games/'+this.editGameListForm.game_image,
      URI: this.editGameListForm.URI
    }

    this.backendService.update_GameList(id, editData).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully Update Game Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    })
  }

  //delete data
  deleteGame(id: any, game_image: any): void{
    this.backendService.delete_GameList(id, game_image).subscribe({
      next: (res) => {
        this.submitted  = true;
        let message = `Successfully delete Game Data with ID: ${id}`;
        this.showToasterSuccess(message);
      }
    })
  }

  confirmBox(id: any, game_image: any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteGame(id, game_image);
        
        Swal.fire(
          'Deleted!',
          'Game Data has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Game Data is Safe',
          'error'
        )
      }
    })
  }

  //notification
  showToasterSuccess(msg: string | undefined){
    this.toastService.showSuccess(msg, "Success");
    setTimeout(() => {
      this.reloadPage()
    }, 2500);
  }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.preview = '';
        this.currentFile = file;
  
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };
  
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  uploadImage(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.backendService.uploadGameImage(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.imageInfos = this.backendService.getGameImage();
            }
          },
          error: (err: any) => {
            // console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the image!';
            }
  
            this.currentFile = undefined;
          },
        });
      }
  
      this.selectedFiles = undefined;
    }
  }

  reloadPage(): void {
    this.retrieveGameList();
    console.clear();
  }

  clearField(): void {
    this.submitted = false;
    this.gameList = {
      game_name: '',
      game_platform: '',
      game_year: '',
      game_rating: '',
      esrb_rating: '',
      pegi_rating: '',
      pegi_cd: '',
      game_description: '',
      game_image: '',
      media: '',
      URI: '',
    };
  }
}
