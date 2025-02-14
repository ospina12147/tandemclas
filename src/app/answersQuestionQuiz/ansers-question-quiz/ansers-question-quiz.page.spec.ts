import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnsersQuestionQuizPage } from './ansers-question-quiz.page';

describe('AnsersQuestionQuizPage', () => {
  let component: AnsersQuestionQuizPage;
  let fixture: ComponentFixture<AnsersQuestionQuizPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsersQuestionQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
