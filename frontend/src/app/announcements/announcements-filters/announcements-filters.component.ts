import { AnnouncementMode } from './../announcement.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcements-filters',
  templateUrl: './announcements-filters.component.html',
  styleUrls: ['./announcements-filters.component.scss']
})
export class AnnouncementsFiltersComponent implements OnInit {
  public modes = AnnouncementMode;
  public games = [
    {
      value: 'league-of-legends',
      name: 'League of legends',
      ranks: ['Brąz V', 'Brąz IV', 'Brąz III']
    },
    {
      value: 'cs-go',
      name: 'CS GO',
      ranks: ['idk', 'idk2']
    }
  ];
  public selectedGame: any = { value: '', name: '', ranks: [] };
  public sortOptions = ['Najnowsze', 'Najstarsze'];
  public constructor() {}

  public ngOnInit(): void {}
}
