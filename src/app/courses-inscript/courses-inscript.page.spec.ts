import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesInscriptPage } from './courses-inscript.page';

describe('CoursesInscriptPage', () => {
  let component: CoursesInscriptPage;
  let fixture: ComponentFixture<CoursesInscriptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesInscriptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
