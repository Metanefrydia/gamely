import { AuthenticationService } from './../../authentication/authentication.service';
import { AnnouncementsService } from './../../announcements/service/announcements.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-announcements',
  templateUrl: './user-announcements.component.html',
  styleUrls: ['./user-announcements.component.scss']
})
export class UserAnnouncementsComponent implements OnInit, OnDestroy {
  public userId: string;
  public userAnnouncements = [];
  public subscription = new Subscription();

  public constructor(private announcementService: AnnouncementsService, private authenticationService: AuthenticationService) { 
    this.userId = authenticationService.getUserId();
  }

  public ngOnInit(): void {
    this.fetchUserAnnouncements();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public handleDelete(announcementId: any): void {
    this.subscription.add(this.announcementService.deleteAnnouncement(announcementId).subscribe((response) => {
      this.fetchUserAnnouncements();
    }))
  }

  public fetchUserAnnouncements(): void {
    this.subscription.add(this.announcementService.getUserAnnouncements(this.userId).subscribe((response) => {
      this.userAnnouncements = response.userAnnouncements;
    }))
  }
}
