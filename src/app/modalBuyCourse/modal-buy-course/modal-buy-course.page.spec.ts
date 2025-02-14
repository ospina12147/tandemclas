import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalBuyCoursePage } from './modal-buy-course.page';

describe('ModalBuyCoursePage', () => {
  let component: ModalBuyCoursePage;
  let fixture: ComponentFixture<ModalBuyCoursePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBuyCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
