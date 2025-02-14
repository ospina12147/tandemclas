import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalEditValorationPage } from './modal-edit-valoration.page';

describe('ModalEditValorationPage', () => {
  let component: ModalEditValorationPage;
  let fixture: ComponentFixture<ModalEditValorationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditValorationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
