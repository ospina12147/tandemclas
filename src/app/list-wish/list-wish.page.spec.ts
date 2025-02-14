import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListWishPage } from './list-wish.page';

describe('ListWishPage', () => {
  let component: ListWishPage;
  let fixture: ComponentFixture<ListWishPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
