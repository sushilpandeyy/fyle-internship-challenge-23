import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposkeltonComponent } from './reposkelton.component';

describe('ReposkeltonComponent', () => {
  let component: ReposkeltonComponent;
  let fixture: ComponentFixture<ReposkeltonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReposkeltonComponent]
    });
    fixture = TestBed.createComponent(ReposkeltonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
