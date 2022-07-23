import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderMonthComponent } from './calender-month.component';

describe('CalenderMonthComponent', () => {
  let component: CalenderMonthComponent;
  let fixture: ComponentFixture<CalenderMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
