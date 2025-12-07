import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardMPage } from './dashboard-m.page';

describe('DashboardMPage', () => {
  let component: DashboardMPage;
  let fixture: ComponentFixture<DashboardMPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
