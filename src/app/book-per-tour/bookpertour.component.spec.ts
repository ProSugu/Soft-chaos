import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookPerTourComponent } from './bookpertour.component';



describe('DashboardComponent', () => {
  let component: BookPerTourComponent;
  let fixture: ComponentFixture<BookPerTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPerTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPerTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
