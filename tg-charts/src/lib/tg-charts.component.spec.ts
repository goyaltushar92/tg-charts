import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TgChartsComponent } from './tg-charts.component';

describe('TgChartsComponent', () => {
  let component: TgChartsComponent;
  let fixture: ComponentFixture<TgChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TgChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TgChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
