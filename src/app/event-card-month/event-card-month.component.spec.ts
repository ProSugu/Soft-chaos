import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardMonthComponent } from './event-card-month.component';

describe('EventCardMonthComponent', () => {
  let component: EventCardMonthComponent;
  let fixture: ComponentFixture<EventCardMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCardMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCardMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
