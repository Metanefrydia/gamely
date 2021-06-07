import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { games } from './../game.models';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-announcements-filters',
  templateUrl: './announcements-filters.component.html',
  styleUrls: ['./announcements-filters.component.scss']
})
export class AnnouncementsFiltersComponent implements OnInit {
  @Output() public filter = new EventEmitter();
  public games = games;
  public form: FormGroup;

  public constructor() {
    this.initForm();
  }

  public ngOnInit(): void {
    this.form.valueChanges.subscribe(val => {
      this.filter.emit(val);
    });
  }

  public initForm(): void {
    this.form = new FormGroup({
      game: new FormControl(null),
      rank: new FormControl(null),
    });
  }

  public getRanks(game: string): string[] {
    return game ? this.games.find((item) => item.name === game).ranks : [];
  }
}
