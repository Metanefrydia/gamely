/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-shadow */

export interface Announcement {
  id?: number;
  title: string;
  game: string;
  maxMembers: number;
  date: Date;
  type: AnnouncementType;
  mode: AnnouncementMode;
  rank?: string;
  description?: string;
}

export enum AnnouncementType {
  PUBLIC = 'Publiczny',
  PRIVATE = 'Prywatny'
}

export enum AnnouncementMode {
  RANKED = 'Rankingowy',
  UNRANKED = 'Nierankingowy'
}
