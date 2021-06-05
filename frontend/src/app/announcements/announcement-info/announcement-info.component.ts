import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Announcement } from '../announcement.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcement-info',
  templateUrl: './announcement-info.component.html',
  styleUrls: ['./announcement-info.component.scss']
})
export class AnnouncementInfoComponent implements OnInit {
  public dialogRef: MatDialogRef<AnnouncementInfoComponent>;
  public membersMock = [
    {username: 'Ania', rank: 'Silver I'}, {username: 'Tomek', rank: 'Bronze II'}, {username: 'Nyanne', rank: 'Gold V'}
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public router: Router, public dialog: MatDialog) {}

  public ngOnInit(): void {
    console.log(this.data);
  }

  public openChatRoom(announcementId: string): void  {
    this.dialog.closeAll();
    this.router.navigate(['/chat-room', announcementId ]);
  }

  public openUserProfile(userName: string): void {
    this.dialog.closeAll();
    this.router.navigate(['/profile/', userName ]);
  }
}
