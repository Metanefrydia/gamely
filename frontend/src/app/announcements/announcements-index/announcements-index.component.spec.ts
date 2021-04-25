import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsIndexComponent } from './announcements-index.component';

describe('AnnouncementsIndexComponent', () => {
  let component: AnnouncementsIndexComponent;
  let fixture: ComponentFixture<AnnouncementsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnouncementsIndexComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
