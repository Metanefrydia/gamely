import { AnnouncementsService } from './../service/announcements.service';
import { Component, OnInit } from '@angular/core';
import { Announcement } from '../announcement.models';

@Component({
  selector: 'app-announcements-index',
  templateUrl: './announcements-index.component.html',
  styleUrls: ['./announcements-index.component.scss']
})
export class AnnouncementsIndexComponent implements OnInit {
  public announcements: any = [];
  public constructor(private announcementService: AnnouncementsService) {}

  public ngOnInit(): void {
    this.announcementService.getAnnouncements().subscribe((response) => {
      this.announcements = response.data;
    });
  }
}
