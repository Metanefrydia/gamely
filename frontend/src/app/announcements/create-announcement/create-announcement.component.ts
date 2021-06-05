import { AuthenticationService } from './../../authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import {
  Announcement,
  AnnouncementMode,
  AnnouncementType
} from '../announcement.models';
import { games } from '../game.models';
import { AnnouncementsService } from '../service/announcements.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.scss']
})
export class CreateAnnouncementComponent implements OnInit {
  public announcementData: Announcement = {
    title: '',
    game: games[0].name,
    mode: AnnouncementMode.UNRANKED,
    type: AnnouncementType.PUBLIC,
    rank: '',
    members: [],
    maxMembers: 0,
    date: new Date(Date.now()),
    description: '',
    createdAt: new Date(Date.now()),
    createdBy: this.authenticationService.getUserId()
  };

  public games = games;
  public readonly monthInMilliseconds = 2629743000;
  public minDate = new Date(Date.now());
  public maxDate = new Date(this.minDate.getTime() + this.monthInMilliseconds);

  public constructor(private router: Router, private announcementsService: AnnouncementsService, private authenticationService: AuthenticationService) {}

  public ngOnInit(): void {}

  public createAnnouncement(): void {
    this.announcementsService
      .createAnnouncement(this.announcementData)
      .subscribe(
        () => {
          this.router.navigateByUrl('/');
        },
        (err) => {
          console.error(err);
        }
      );
  }

  public getRanks(game: string): string[] {
    return this.games.find((item) => item.name === game).ranks;
  }

  public shouldDisableRankControl(): boolean {
    return (
      this.getRanks(this.announcementData.game).length === 0 ||
      this.announcementData.mode === AnnouncementMode.UNRANKED
    );
  }
}
