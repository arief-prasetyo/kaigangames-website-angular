import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//services
import { TokenStorageService } from '../../services/token-storage.service';
import { BackendService } from "../../services/backend.service";
import { ToastNotificationService } from '../../services/toast-notification.service';
//model
import { GameVideo } from "../../models/backend/game-video.model";
import { GameList } from '../../models/backend/game-list.model';
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt, faSearch} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { AngularFaviconService } from 'angular-favicon';
@Component({
  selector: 'app-game-video',
  templateUrl: './game-video.component.html',
  styleUrls: ['./game-video.component.sass']
})
export class GameVideoComponent {
  editGameVideoForm: GameVideo = new GameVideo();

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
  GameVideo: GameVideo = {
    game_id: '',
    game_name: '',
    game_uri: '',
    createdAt: ''
  };
  submitted = false;
  GameVideoData?: GameVideo[];
  tagItems = [];
  //edit data
  id?: number;
  //login check
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  //game list
  gameListData?: GameList[];

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
    this.retrieveGameVideo();
    this.retrieveGameList();
  }

  onSubmit(): void {
    //get game id
    let GameData = this.GameVideo.game_name;
    let GameID = GameData.charAt(0);
    let RealGameName = GameData.substring(1);

    const data = {
      game_id: GameID,
      game_name: RealGameName,
      game_uri: this.GameVideo.game_uri,
      createdAt: this.GameVideo.createdAt
    };
    
    this.backendService.create_GameVideo(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;
          let message = "Successfully Create New Game Video.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });

    this.clearField();
  }

  //get data
  retrieveGameVideo(): void{
    this.backendService.get_GameVideo().subscribe({
      next: (data) => {
        this.GameVideoData = data;
        
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

  //get game list
  retrieveGameList(): void{
    this.backendService.get_GameList().subscribe({
      next: (data) => {
        this.gameListData = data;
      },
      error: (e) => console.error(e)
    })
  }

  //edit data
  editData(id: any): void{
    this.backendService.edit_GameVideo(id).subscribe((data) => {
      this.editGameVideoForm.game_id = data.game_id;
      this.editGameVideoForm.game_name = data.game_name;
      this.editGameVideoForm.game_uri = data.game_uri;
      this.editGameVideoForm.createdAt = data.createdAt;
      this.id = data.id
    })
  }

  updateData(id: any): void{
    const editData = {
      game_id: this.editGameVideoForm.game_id,
      game_name: this.editGameVideoForm.game_name,
      game_uri: this.editGameVideoForm.game_uri,
      createdAt: this.editGameVideoForm.createdAt
    }

    this.backendService.update_GameVideo(id, editData).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully Update Game Video Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    })
  }

  //delete data
  deleteGameVideo(id: any): void{
    this.backendService.delete_GameVideo(id).subscribe({
      next: (res) => {
        this.submitted  = true;
        let message = `Successfully delete Game Video Data with ID: ${id}`;
        this.showToasterSuccess(message);
      }
    })
  }

  confirmBox(id: any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteGameVideo(id);
        
        Swal.fire(
          'Deleted!',
          'Game Video Data has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Game Video Data is Safe',
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
    }, 2000);
  }

  reloadPage(): void {
    this.retrieveGameVideo();
    // console.clear();
  }

  clearField(): void {
    this.submitted = false;
    this.GameVideo = {
      game_id: '',
      game_name: '',
      game_uri: ''
    };
  }
}
