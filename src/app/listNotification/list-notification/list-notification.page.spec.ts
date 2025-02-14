import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListNotificationPage } from './list-notification.page';

describe('ListNotificationPage', () => {
  let component: ListNotificationPage;
  let fixture: ComponentFixture<ListNotificationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
