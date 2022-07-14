import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinUsServiceComponent } from './join-us-service.component';

describe('JoinUsServiceComponent', () => {
  let component: JoinUsServiceComponent;
  let fixture: ComponentFixture<JoinUsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinUsServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinUsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
