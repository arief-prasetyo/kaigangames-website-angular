import { Component } from '@angular/core';
//service
import { BackendService } from "../../../services/backend.service";
//model
import { GameList } from "../../../models/backend/game-list.model";
import { ActivatedRoute } from '@angular/router';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.sass']
})
export class GamesComponent {
  gameDetailData: GameList = new GameList();
  id: number | undefined;
  gamePlatf = '';
  splitData: any = [];

  constructor(private backendService: BackendService, private route: ActivatedRoute,  private ngxFavicon: AngularFaviconService){
    $('body').removeClass("bg-theme2");
    this.id = this.route.snapshot.params['id'];
    this.gameDetail(this.id);
  }

  ngOnInit(): void {
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
  }

  gameDetail(id: any): void{
    this.backendService.edit_GameList(id).subscribe((data) => {
      this.gameDetailData.game_image = data.game_image;
      this.gameDetailData.game_name = data.game_name;
      this.gameDetailData.game_description = data.game_description;
      this.gameDetailData.game_year = data.game_year;
      this.gameDetailData.game_platform = data.game_platform;
      this.gameDetailData.game_rating = data.game_rating;
      this.gameDetailData.esrb_rating = data.esrb_rating;
      this.gameDetailData.pegi_rating = data.pegi_rating;
      this.gameDetailData.pegi_cd = data.pegi_cd;
      this.gameDetailData.media = data.media;
      this.gameDetailData.URI = data.URI;
      this.gameDetailData.image_path = data.image_path;
      this.gameDetailData.createdAt = data.createdAt;
      
      //platform
      this.gamePlatf = this.gameDetailData.game_platform;
      this.splitData = this.gamePlatf.split(', ');
    })
  }
}
