import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasboardDPage } from './dasboard-d.page';

describe('DasboardDPage', () => {
  let component: DasboardDPage;
  let fixture: ComponentFixture<DasboardDPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
