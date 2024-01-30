import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipformComponent } from './bipform.component';

describe('BipformComponent', () => {
  let component: BipformComponent;
  let fixture: ComponentFixture<BipformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BipformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BipformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
