import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailTopicPage } from './detail-topic.page';

describe('DetailTopicPage', () => {
  let component: DetailTopicPage;
  let fixture: ComponentFixture<DetailTopicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTopicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
