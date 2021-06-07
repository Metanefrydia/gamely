import { Subscription } from 'rxjs';
import { AnnouncementsService } from './../service/announcements.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-announcements-index',
  templateUrl: './announcements-index.component.html',
  styleUrls: ['./announcements-index.component.scss']
})
export class AnnouncementsIndexComponent implements OnInit, OnDestroy {
  public announcements: any = [];
  public subscription = new Subscription();
  public constructor(private announcementService: AnnouncementsService) {}

  public ngOnInit(): void {
    setTimeout(() => this.fetchAnnouncements(), 1)
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public fetchAnnouncements(filters = {game: null, rank: null}): void {
    this.subscription = this.announcementService.getAnnouncements(filters).subscribe((response) => {
      this.announcements = response.data;
    });
  }

  public filterAnnouncements(filters): void {
    this.fetchAnnouncements(filters);
  }
}
