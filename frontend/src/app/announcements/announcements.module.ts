import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AnnouncementsIndexComponent } from './announcements-index/announcements-index.component';
import { AnnouncementCardComponent } from './announcement-card/announcement-card.component';
import { AnnouncementsFiltersComponent } from './announcements-filters/announcements-filters.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule
} from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [
    AnnouncementsIndexComponent,
    AnnouncementCardComponent,
    AnnouncementsFiltersComponent,
    CreateAnnouncementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMatTimepickerModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  providers: [MatDatepickerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    AnnouncementsIndexComponent,
    AnnouncementCardComponent,
    AnnouncementsFiltersComponent,
    CreateAnnouncementComponent
  ]
})
export class AnnouncementsModule {}
