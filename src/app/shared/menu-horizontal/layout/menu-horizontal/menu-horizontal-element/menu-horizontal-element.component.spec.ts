import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHorizontalElementComponent } from './menu-horizontal-element.component';

describe('MenuHorizontalElementComponent', () => {
  let component: MenuHorizontalElementComponent;
  let fixture: ComponentFixture<MenuHorizontalElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuHorizontalElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuHorizontalElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
