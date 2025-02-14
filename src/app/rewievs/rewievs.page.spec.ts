import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RewievsPage } from './rewievs.page';

describe('RewievsPage', () => {
  let component: RewievsPage;
  let fixture: ComponentFixture<RewievsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RewievsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
