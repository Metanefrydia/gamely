import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from '../announcement.models';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementInfoComponent } from '../announcement-info/announcement-info.component';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.scss']
})
export class AnnouncementCardComponent {
  @Input() public announcement: Announcement;

  public constructor(private router: Router, public dialog: MatDialog){}

  public openChatRoom(announcementId: string): void  {
    this.router.navigate(['/chat-room', announcementId ]);
  }

  public openAnnouncementDialog(): void {
    const dialogRef = this.dialog.open(AnnouncementInfoComponent, {
      data: {
        announcement: this.announcement
      }
    });

    dialogRef.afterClosed().subscribe();
  }
}
