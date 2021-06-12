import { AuthenticationService } from './../../authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UserData, UserGame } from '../models/user.models';
import { games } from '../../announcements/game.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  public form: FormGroup;
  public profile: UserData;
  public imageData: string;
  public _id: string;

  public games = games;
  public userData: UserData = {
    _id: '',
    email: '',
    name: '',
    imagePath: '',
    birthYear: 0,
    games: [],
    description: '',
    createdAnnouncements: []
  };

  public constructor(
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {
    this._id = this.authService.getUserId();
  }

  public ngOnInit(): void {
    this.authService
      .getProfileById(this.authService.getUserId())
      .subscribe((response) => {
        this.form = new FormGroup({
          name: new FormControl(response.user.name),
          email: new FormControl(response.user.email),
          birthYear: new FormControl(response.user.birthYear),
          description: new FormControl(response.user.description),
          image: new FormControl(null),
          games: new FormControl(response.user.games)
        });
        this.imageData = response.user.imagePath;
      });
  }

  public updateForm(numberOfHours: number, gameIndex: number) {
    this.form.value.games[gameIndex].numberOfHours = numberOfHours;
    this.form.controls["games"].setValue([...this.form.value.games]);
  }

  public getRanks(game: string): string[] {
    if (game === '') {
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
      game: '',
      rank: '',
      numberOfHours: 0
    };
    this.form.controls["games"].setValue([...this.form.value.games, newGame]);
  }

  public deleteGame(game: UserGame) {
    this.form.value.games = this.form.value.games.filter(
      (g) => game.game !== g.game
    );
  }

  public openSnackBar(message: string, action: string, options: any) {
    this._snackBar.open(message, action, options);
  }

  public onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  public openInput(): void {
    document.getElementById('image').click();
  }

  public onSubmit() {
    this.authService
      .editProfile(
        this._id,
        this.form.value.name,
        this.form.value.birthYear,
        this.form.value.games,
        this.form.value.image,
        this.form.value.email,
        this.form.value.description,
      )
      .subscribe((response) => {
        this.openSnackBar('Zapisano dane!', 'Zamknij', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      }),
      (err) => {
        this.openSnackBar('Wystąpił błąd. Spróbuj jeszcze raz.', 'Zamknij', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      };
  }
}
