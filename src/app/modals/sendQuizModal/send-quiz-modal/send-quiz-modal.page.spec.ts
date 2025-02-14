import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendQuizModalPage } from './send-quiz-modal.page';

describe('SendQuizModalPage', () => {
  let component: SendQuizModalPage;
  let fixture: ComponentFixture<SendQuizModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SendQuizModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
