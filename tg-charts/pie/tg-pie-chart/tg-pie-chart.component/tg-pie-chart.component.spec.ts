import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TgPieChartComponent } from './tg-pie-chart.component';

describe('TgPieChartComponent', () => {
  let component: TgPieChartComponent;
  let fixture: ComponentFixture<TgPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TgPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TgPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
