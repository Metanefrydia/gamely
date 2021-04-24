/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-shadow */

export class Announcement {
  id: number;
  title: string; // input
  description: string; // text area
  maxMembers: number; // input
  date: Date; // date picker
  type: AnnouncementType; // combo
  mode: AnnouncementMode; // combo
  game: string; // combo
  rank: string; // combo
}

export enum AnnouncementType {
  PUBLIC = 'Public',
  PRIVATE = 'Private'
}

export enum AnnouncementMode {
  RANKED = 'Ranked',
  UNRANKED = 'Unranked'
}
