import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Announcement } from './../announcement.models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {
  public constructor(private http: HttpClient) {}

  public reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });

  public createAnnouncement(announcement: Announcement): Observable<any> {
    return this.http.post(`/api/announcement`, announcement, { headers: this.reqHeader });
  }

  public getAnnouncements(filters): Observable<any> {
    return this.http.get(`api/announcements/${filters.game}/${filters.rank}`);
  }

  public getUserAnnouncements(userId: string): Observable<any> {
    return this.http.get(`api/user-announcements/${userId}`);
  }

  public deleteAnnouncement(announcementId: string): Observable<any> {
    return this.http.delete(`api/announcement/${announcementId}`);
  }

  public getAnnouncementById(announcementId: string): Observable<any> {
    return this.http.get(`api/announcement/${announcementId}`);
  }

  public editAnnouncement(announcementId: string, announcement: Announcement): Observable<any> {
    return this.http.put(`api/announcement/${announcementId}`, announcement);
  }
}
