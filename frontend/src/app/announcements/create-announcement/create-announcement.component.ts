import { Component, OnInit } from '@angular/core';
import {
  Announcement,
  AnnouncementMode,
  AnnouncementType
} from '../announcement.models';
import { games } from '../game.models';
import { AnnouncementsService } from '../service/announcements.service';

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
    maxMembers: 0,
    date: new Date(Date.now()),
    description: ''
  };

  public games = games;
  public readonly monthInMilliseconds = 2629743000;
  public minDate = new Date(Date.now());
  public maxDate = new Date(this.minDate.getTime() + this.monthInMilliseconds);

  public constructor(private announcementsService: AnnouncementsService) {}

  public ngOnInit(): void {}

  public createAnnouncement(): void {
    this.announcementsService
      .createAnnouncement(this.announcementData)
      .subscribe();
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
