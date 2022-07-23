import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPerScheduleComponent } from './book-per-schedule.component';

describe('BookPerScheduleComponent', () => {
  let component: BookPerScheduleComponent;
  let fixture: ComponentFixture<BookPerScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPerScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPerScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
