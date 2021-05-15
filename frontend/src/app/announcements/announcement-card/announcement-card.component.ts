import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from '../announcement.models';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.scss']
})
export class AnnouncementCardComponent {
  @Input() public announcement: Announcement;

  public constructor(private router: Router){}

  public openChatRoom(announcementId: string): void  {
    this.router.navigate(['/chat-room', announcementId ]);
  }
}
