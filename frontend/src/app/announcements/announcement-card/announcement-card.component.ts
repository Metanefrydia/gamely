import { Component, OnInit } from '@angular/core';
import {
  Announcement,
  AnnouncementMode,
  AnnouncementType
} from '../announcement.models';
import { games } from '../game.models';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.scss']
})
export class AnnouncementCardComponent implements OnInit {
  public announcements: Announcement[] = [
    {
      id: 1,
      title: 'League of legends',
      description:
        'Poszukuję doświadczonego zespołu do gry na teraz oraz na regularne rozgrywki weekendowe. :)',
      maxMembers: 5,
      date: new Date('2021-06-21'),
      type: AnnouncementType.PUBLIC,
      mode: AnnouncementMode.RANKED,
      game: games[0].name,
      rank: 'Silver I'
    },
    {
      id: 1,
      title: 'League of legends',
      description:
        'Poszukuję doświadczonego zespołu do gry na teraz oraz na regularne rozgrywki weekendowe. :)',
      maxMembers: 5,
      date: new Date('2021-06-21'),
      type: AnnouncementType.PUBLIC,
      mode: AnnouncementMode.RANKED,
      game: games[0].name,
      rank: 'Silver I'
    },
    {
      id: 1,
      title: 'League of legends',
      description:
        'Poszukuję doświadczonego zespołu do gry na teraz oraz na regularne rozgrywki weekendowe. :)',
      maxMembers: 5,
      date: new Date('2021-06-21'),
      type: AnnouncementType.PUBLIC,
      mode: AnnouncementMode.RANKED,
      game: games[0].name,
      rank: 'Silver I'
    },
    {
      id: 1,
      title: 'League of legends',
      description:
        'Poszukuję doświadczonego zespołu do gry na teraz oraz na regularne rozgrywki weekendowe. :)',
      maxMembers: 5,
      date: new Date('2021-06-21'),
      type: AnnouncementType.PUBLIC,
      mode: AnnouncementMode.RANKED,
      game: games[0].name,
      rank: 'Silver I'
    }
  ];
  public constructor() {}

  public ngOnInit(): void {}
}
