import { Component, Input } from '@angular/core';
import { Announcement } from '../announcement.models';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.scss']
})
export class AnnouncementCardComponent {
  @Input() public announcement: Announcement;
}
