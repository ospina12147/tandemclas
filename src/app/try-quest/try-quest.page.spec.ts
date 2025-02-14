import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TryQuestPage } from './try-quest.page';

describe('TryQuestPage', () => {
  let component: TryQuestPage;
  let fixture: ComponentFixture<TryQuestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TryQuestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
