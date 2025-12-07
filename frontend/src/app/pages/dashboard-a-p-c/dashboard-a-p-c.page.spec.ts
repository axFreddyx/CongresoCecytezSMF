import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardAPCPage } from './dashboard-a-p-c.page';

describe('DashboardAPCPage', () => {
  let component: DashboardAPCPage;
  let fixture: ComponentFixture<DashboardAPCPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAPCPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
