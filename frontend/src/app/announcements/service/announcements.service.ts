import { HttpClient } from '@angular/common/http';
import { Announcement } from './../announcement.models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {
  public constructor(private http: HttpClient) {}

  public createAnnouncement(announcement: Announcement): Observable<any> {
    return this.http.post(`/api/announcement`, announcement);
  }
}
