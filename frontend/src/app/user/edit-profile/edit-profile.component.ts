import { AuthenticationService } from './../../authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UserData, UserGame } from '../models/user.models';
import { games } from '../../announcements/game.models'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  public games = games;
  public userData: UserData = {
    _id: '',
    email: '',
    name: '',
    birthYear: 0,
    games: [],
    description: '',
    createdAnnouncements: []
  }

  public constructor(private authService: AuthenticationService, private _snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    this.authService.profile().subscribe((response) => {
      this.userData = response.user;
    })
  }

  public editProfile(): void {
    this.authService.editProfile(this.userData).subscribe(() => {
      this.openSnackBar("Zapisano dane!", 'Zamknij', { duration: 2000, panelClass: ['success-snackbar']})
    },
    (err) => {
      this.openSnackBar("Wystąpił błąd. Spróbuj jeszcze raz.", 'Zamknij', { duration: 3000, panelClass: ['error-snackbar']})
    });
  }

  public getRanks(game: string): string[] {
    if (game === "") {
      return [];
    } else {
      return this.games.find((item) => item.name === game).ranks;
    }
  }

  public shouldDisableRankControl(game: string): boolean {
    return this.getRanks(game).length === 0;
  }

  public addNewGame(): void {
    const newGame = {
        game: "",
        rank: "",
        numberOfHours: 0
    }
    this.userData.games = [...this.userData.games, newGame]
  }

  public deleteGame(game: UserGame) {
    this.userData.games = this.userData.games.filter((g) => game.game !== g.game);
  }

  public openSnackBar(message: string, action: string, options: any) {
    this._snackBar.open(message, action, options);
  }
}
