import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListAssigmentPage } from './list-assigment.page';

describe('ListAssigmentPage', () => {
  let component: ListAssigmentPage;
  let fixture: ComponentFixture<ListAssigmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssigmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
