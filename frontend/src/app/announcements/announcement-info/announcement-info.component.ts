import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcement-info',
  templateUrl: './announcement-info.component.html',
  styleUrls: ['./announcement-info.component.scss']
})
export class AnnouncementInfoComponent {
  public dialogRef: MatDialogRef<AnnouncementInfoComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public router: Router, public dialog: MatDialog) {}

  public openChatRoom(announcementId: string): void  {
    this.dialog.closeAll();
    this.router.navigate(['/chat-room', announcementId ]);
  }

  public openUserProfile(userName: string): void {
    this.dialog.closeAll();
    this.router.navigate(['/profile/', userName ]);
  }
}
