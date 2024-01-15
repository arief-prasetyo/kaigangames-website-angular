import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//services
import { TokenStorageService } from '../../services/token-storage.service';
import { BackendService } from "../../services/backend.service";
import { ToastNotificationService } from '../../services/toast-notification.service';
//model
import { GameFaq } from "../../models/backend/game-faq.model";
import { GameList } from '../../models/backend/game-list.model';
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt, faSearch} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-game-faqs',
  templateUrl: './game-faqs.component.html',
  styleUrls: ['./game-faqs.component.sass']
})
export class GameFaqsComponent {
  editGameFaqForm: GameFaq = new GameFaq();

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
  GameFaq: GameFaq = {
    game_id: '',
    game_name: '',
    faq_title: '',
    faq_content: '',
    faq_data_target: '',
    createdAt: ''
  };
  submitted = false;
  GameFaqData?: GameFaq[];
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
    this.retrieveGameFAQ();
    this.retrieveGameList();
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

  retrieveGameFAQ(){
    this.backendService.get_GameFAQ().subscribe({
      next: (data) => {
        this.GameFaqData = data;
        
        setTimeout(()=>{   
          $('#datatableGameFAQ').DataTable( {
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

  onSubmit(): void {
    //get game id
    let GameData = this.GameFaq.game_name;
    let GameID = GameData.charAt(0);
    let RealGameName = GameData.substring(1);

    const data = {
      game_id: GameID,
      game_name: RealGameName,
      faq_title: this.GameFaq.faq_title,
      faq_content: this.GameFaq.faq_content,
      faq_data_target: this.GameFaq.faq_data_target,
      createdAt: this.GameFaq.createdAt
    };
    
    this.backendService.create_GameFAQ(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;
          let message = "Successfully Create New Game FAQ.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });

    this.clearField();
  }

  //edit data
  editData(id: any): void{
    this.backendService.edit_GameFAQ(id).subscribe((data) => {
      this.editGameFaqForm.game_id = data.game_id;
      this.editGameFaqForm.game_name = data.game_name;
      this.editGameFaqForm.faq_title = data.faq_title;
      this.editGameFaqForm.faq_content = data.faq_content;
      this.editGameFaqForm.faq_data_target = data.faq_data_target;
      this.editGameFaqForm.createdAt = data.createdAt;
      this.id = data.id
    })
  }

  updateData(id: any): void{
    //get game name
    let GameData = this.editGameFaqForm.game_name;
    let RealGameName = GameData.substring(1);

    const editData = {
      game_id: this.editGameFaqForm.game_id,
      game_name: RealGameName,
      faq_title: this.editGameFaqForm.faq_title,
      faq_content: this.editGameFaqForm.faq_content,
      faq_data_target: this.editGameFaqForm.faq_data_target,
      createdAt: this.editGameFaqForm.createdAt
    }

    this.backendService.update_GameFAQ(id, editData).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully Update Game FAQ Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    })
  }

  //delete data
  deleteGameFAQ(id: any): void{
    this.backendService.delete_GameFAQ(id).subscribe({
      next: (res) => {
        this.submitted  = true;
        let message = `Successfully delete Game FAQ Data with ID: ${id}`;
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
        this.deleteGameFAQ(id);
        
        Swal.fire(
          'Deleted!',
          'Game FAQ Data has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Game FAQ Data is Safe',
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
    this.retrieveGameFAQ();
  }

  clearField(): void {
    this.submitted = false;
    this.GameFaq = {
      game_id: '',
      game_name: '',
      faq_title: '',
      faq_content: '',
      faq_data_target: ''
    };
  }
}
