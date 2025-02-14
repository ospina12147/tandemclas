import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalDetailsQuizPage } from './modal-details-quiz.page';

describe('ModalDetailsQuizPage', () => {
  let component: ModalDetailsQuizPage;
  let fixture: ComponentFixture<ModalDetailsQuizPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailsQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
