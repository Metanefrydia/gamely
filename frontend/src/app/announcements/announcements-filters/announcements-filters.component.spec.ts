import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsFiltersComponent } from './announcements-filters.component';

describe('AnnouncementsFiltersComponent', () => {
  let component: AnnouncementsFiltersComponent;
  let fixture: ComponentFixture<AnnouncementsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementsFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
