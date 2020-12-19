import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TgPieChartComponent } from './tg-pie-chart.component/tg-pie-chart.component';
import { TgChartPieArcDirective } from './tg-chart-pie-arc.directive';
import { TgChartPieArcGroupDirective } from './tg-chart-pie-arc-group.directive';
import { TgDoughnutChartDirective } from './tg-chart-doughnut.directive';




@NgModule({
  declarations: [
    TgPieChartComponent, TgChartPieArcDirective, TgChartPieArcGroupDirective, TgDoughnutChartDirective
  ],
  exports: [TgPieChartComponent, TgChartPieArcDirective, TgChartPieArcGroupDirective, TgDoughnutChartDirective],
  imports: [
    CommonModule
  ]
})
export class TgPieChartModule { }
