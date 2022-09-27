import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolboxListComponent } from './toolbox-list.component';

describe('ToolboxListComponent', () => {
  let component: ToolboxListComponent;
  let fixture: ComponentFixture<ToolboxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolboxListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
