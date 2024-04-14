import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileskeltonComponent } from './profileskelton.component';

describe('ProfileskeltonComponent', () => {
  let component: ProfileskeltonComponent;
  let fixture: ComponentFixture<ProfileskeltonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileskeltonComponent]
    });
    fixture = TestBed.createComponent(ProfileskeltonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
