import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReductionGoalFormComponent } from './reduction-goal-form.component';

describe('ReductionGoalFormComponent', () => {
  let component: ReductionGoalFormComponent;
  let fixture: ComponentFixture<ReductionGoalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReductionGoalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReductionGoalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
