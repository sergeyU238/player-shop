import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavListGroup } from './nav-list-group';

describe('NavListGroup', () => {
  let component: NavListGroup;
  let fixture: ComponentFixture<NavListGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavListGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(NavListGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
