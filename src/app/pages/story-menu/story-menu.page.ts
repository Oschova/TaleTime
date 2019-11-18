import {Component, OnInit} from "@angular/core";
import {MenuController, NavController, Platform} from "@ionic/angular";
import {Reader, StoryInformation} from "../../models/storyInformation";
import {AuthService} from "../../services/auth/auth.service";
import {StoryService} from "../../services/story/story.service";
import {Router} from "@angular/router";
import {PlayerParamsService} from "../../services/player-parmas/player-params.service";
import {PlayerParams} from "../../models/player/player-params";
import {StoryInformationService} from "../../services/story-information/story-information.service";
import {Storage} from "@ionic/storage";

@Component({
  selector: "app-story-menu",
  templateUrl: "./story-menu.page.html",
  styleUrls: ["./story-menu.page.scss"],
})
export class StoryMenuPage implements OnInit {

  activeUserProfileName: string;
  activeUserProfileAvatarName: string;

  constructor(
    private storage: Storage,
    public platform: Platform,
    // public app: App,
    public router: Router,
    public playerParamsService: PlayerParamsService,
    public storyInformationService: StoryInformationService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private authService: AuthService,
    public storyService: StoryService
  ) {
    if(this.authService.currentUserAccount == null){
      this.router.navigate(["/start"]);
    }
    const activeUserProfile = this.authService.getActiveUserProfile();
    console.log("STORY_MENU_CURRENT_USER: ", this.authService.currentUserAccount);
    if (activeUserProfile) {
      this.activeUserProfileName = activeUserProfile.name;
      this.activeUserProfileAvatarName = activeUserProfile.avatar.name;
    }
  }

  public get stories(): Array<StoryInformation> {
    return this.storyService.stories;
  }

  goToSelectUserProfilePage() {
    this.navCtrl.navigateForward("/select-user-profile");
  }

  showDetails(story: StoryInformation) {
    this.storyInformationService.storyInformation = story;
    this.router.navigate(["/story-details"]);
  }

  deleteStory(story: StoryInformation) {
    this.storyService.deleteStory(story.id);
  }

  goToPlayerPage(storyId: string) {
    let playerParams = new PlayerParams();
    playerParams.storyId = storyId;
    playerParams.mode = "begin";

    this.playerParamsService.setPlayerParams(playerParams);
    this.router.navigate(["/player"]);
  }

  goToAvailableStories() {
    this.router.navigate(["/tabs/available-stories"]);
  }

  getSubtitle(r: Reader) {
    return " " + r.name;
  }

  ngOnInit() {
  }

}
