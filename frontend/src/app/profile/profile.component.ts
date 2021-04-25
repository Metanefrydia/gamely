import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../authentication/authentication.models';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public details: UserDetails | undefined;

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    this.auth.profile().subscribe(
      (user) => {
        this.details = user;
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
