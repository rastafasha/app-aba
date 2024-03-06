import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartReplacementComponent } from './chart-replacement.component';

describe('ChartReplacementComponent', () => {
  let component: ChartReplacementComponent;
  let fixture: ComponentFixture<ChartReplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartReplacementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartReplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
