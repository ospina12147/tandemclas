import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestAndRespondPage } from './quest-and-respond.page';

describe('QuestAndRespondPage', () => {
  let component: QuestAndRespondPage;
  let fixture: ComponentFixture<QuestAndRespondPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestAndRespondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
