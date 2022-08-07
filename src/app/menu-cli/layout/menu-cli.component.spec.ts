import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCliComponent } from './menu-cli.component';

describe('MenuCliComponent', () => {
  let component: MenuCliComponent;
  let fixture: ComponentFixture<MenuCliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
