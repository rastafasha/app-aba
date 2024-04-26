import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLogReportComponent } from './client-log-report.component';

describe('ClientLogReportComponent', () => {
  let component: ClientLogReportComponent;
  let fixture: ComponentFixture<ClientLogReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientLogReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientLogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
