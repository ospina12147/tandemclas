import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalDetailCoursePage } from './modal-detail-course.page';

describe('ModalDetailCoursePage', () => {
  let component: ModalDetailCoursePage;
  let fixture: ComponentFixture<ModalDetailCoursePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
