import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {
  public constructor(public auth: AuthenticationService) {}

  public ngOnInit(): void {}

  public handleLogout(): void {
    this.auth.logout();
  }

  public getUserName(): string {
    return this.auth.getUserDetails().name;
  }

  public isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
