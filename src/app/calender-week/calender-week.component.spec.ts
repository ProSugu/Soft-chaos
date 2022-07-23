import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderWeekComponent } from './calender-week.component';

describe('CalenderWeekComponent', () => {
  let component: CalenderWeekComponent;
  let fixture: ComponentFixture<CalenderWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderWeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
