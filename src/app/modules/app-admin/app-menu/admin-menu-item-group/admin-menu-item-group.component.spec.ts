import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuItemGroupComponent } from './admin-menu-item-group.component';

describe('AdminMenuItemGroupComponent', () => {
  let component: AdminMenuItemGroupComponent;
  let fixture: ComponentFixture<AdminMenuItemGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMenuItemGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMenuItemGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
