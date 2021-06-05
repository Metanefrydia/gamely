import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { UserData } from '../models/user.models';
import { games } from '../../announcements/game.models';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: UserData;
  public currentYear = new Date().getFullYear();

  public constructor(private auth: AuthenticationService, private route: ActivatedRoute) {}

  public ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.fetchProfile(params.get('name'));
    });
  }

  public fetchProfile(userName: string): void {
    this.auth.getProfile(userName).subscribe(
      (response) => {
        this.user = response.user;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  public getGameLogo(gameName: string) {
    return games.filter((game) => game.name === gameName).map((game) => game.logo).toString()
  }
}
