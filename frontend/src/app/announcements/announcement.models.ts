/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-shadow */

export interface Announcement {
  _id?: string;
  title: string;
  game: string;
  members: string[];
  maxMembers: number;
  date: Date;
  type: AnnouncementType;
  mode: AnnouncementMode;
  rank?: string;
  description?: string;
  createdAt: Date;
  createdBy: string;
}

export enum AnnouncementType {
  PUBLIC = 'Publiczny',
  PRIVATE = 'Prywatny'
}

export enum AnnouncementMode {
  RANKED = 'Rankingowy',
  UNRANKED = 'Nierankingowy'
}
