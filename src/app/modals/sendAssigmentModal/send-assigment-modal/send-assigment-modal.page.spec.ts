import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendAssigmentModalPage } from './send-assigment-modal.page';

describe('SendAssigmentModalPage', () => {
  let component: SendAssigmentModalPage;
  let fixture: ComponentFixture<SendAssigmentModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SendAssigmentModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
