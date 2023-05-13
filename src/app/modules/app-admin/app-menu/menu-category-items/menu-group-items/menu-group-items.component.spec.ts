import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGroupItemsComponent } from './menu-group-items.component';

describe('MenuGroupItemsComponent', () => {
  let component: MenuGroupItemsComponent;
  let fixture: ComponentFixture<MenuGroupItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuGroupItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuGroupItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
