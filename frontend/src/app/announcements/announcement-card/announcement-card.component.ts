import { AnnouncementsService } from './../service/announcements.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from '../announcement.models';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementInfoComponent } from '../announcement-info/announcement-info.component';
import { games } from '../../announcements/game.models';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.scss']
})
export class AnnouncementCardComponent {
  @Input() public announcement: Announcement;
  @Input() public canDelete: boolean = false;
  @Output() public deleteAnnouncement = new EventEmitter<any>();;

  public constructor(private router: Router, public dialog: MatDialog, private announcementService: AnnouncementsService){}

  public openChatRoom(announcementId: string): void  {
    this.router.navigate(['/chat-room', announcementId ]);
  }

  public getGameLogo(gameName: string) {
    return games.filter((game) => game.name === gameName).map((game) => game.logo).toString()
  }

  public openAnnouncementDialog(): void {
    const dialogRef = this.dialog.open(AnnouncementInfoComponent, {
      data: {
        announcement: this.announcement
      }
    });

    dialogRef.afterClosed().subscribe();
  }

  public emitDeleteAnnouncement(announcementId: string): void {
    this.deleteAnnouncement.emit(announcementId);
  }
}
