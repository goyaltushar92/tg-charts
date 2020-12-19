import { Component, Directive, ElementRef, Host, Inject, Injectable, InjectionToken, Input, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { EMPTY, fromEvent, merge, NEVER, of } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { PieSeriesItem } from '../pie-series-item';
import { Destroyable } from 'tg-charts';
import { ArcRadiusInfo, ArcRadiusModifier, ArcRadiusModifierComplex, ARC_RADIUS_MODIFIER } from '../arc-radius-modifier';
import { PIE_ARCS_COLOUR_SET, DEFAULT_COLOUR_SET } from '../pie-arcs-color-set';

@Component({
  selector: 'tg-chart-pie',
  templateUrl: './tg-pie-chart.component.html',
  styleUrls: ['./tg-pie-chart.component.scss']
})
export class TgPieChartComponent extends Destroyable implements OnInit, OnDestroy {
  @Input()
  data: Array<PieSeriesItem> = [];

  outerRadius!: number;
  innerRadius = 0;

  height!: number;
  width!: number;

  arcRadiusModifier: ArcRadiusModifierComplex;
  colourSet: Array<string>;
  constructor(
    private elementRef: ElementRef<Element>,
    @Optional()
    @Inject(ARC_RADIUS_MODIFIER)
    arcRadiusModifier?: Array<ArcRadiusModifier>,
    @Optional()
    @Inject(PIE_ARCS_COLOUR_SET)
    colourSet?: Array<string>
  ) {
    super();
    this.colourSet = colourSet || DEFAULT_COLOUR_SET;
    if (arcRadiusModifier) {
      if (Array.isArray(arcRadiusModifier)) {
        const modifier = (a: ArcRadiusInfo) => arcRadiusModifier.reduce((pv, cv) => this._normalizeArcRadiusModifier(cv).modifier(pv), a);
        const changed = merge(...arcRadiusModifier.map(a => this._normalizeArcRadiusModifier(a).changed));
        this.arcRadiusModifier = { modifier, changed };
      } else {
        throw new Error('@Inject(ARC_RADIUS_MODIFIER) resulted in non array, did you forgot to set `multi:true` in provider');
      }
    } else {
      this.arcRadiusModifier = { modifier: (a) => a, changed: EMPTY };
    }
  }

  ngOnInit(): void {
    merge(
      of(null),
      this.arcRadiusModifier.changed.pipe(debounceTime(20)),
      fromEvent(window, 'resize').pipe(debounceTime(20))
    ).pipe(takeUntil(this.destroyed)).subscribe(() => this.resize());
  }
  ngOnDestroy(): void {
    this.onDestroy();
  }
  resize(): void {
    this.width = this.height = this.elementRef.nativeElement.clientHeight <= this.elementRef.nativeElement.clientWidth
      ? this.elementRef.nativeElement.clientHeight : this.elementRef.nativeElement.clientWidth;

    this.outerRadius = this.width / 2;
    this.innerRadius = 0;

    const radius = this.arcRadiusModifier.modifier({ outerRadius: this.outerRadius, innerRadius: this.innerRadius });

    this.outerRadius = radius.outerRadius;
    this.innerRadius = radius.innerRadius;
  }

  _normalizeArcRadiusModifier(arcRadiusModifier: ArcRadiusModifier): ArcRadiusModifierComplex {
    return typeof arcRadiusModifier === 'function' ? { modifier: arcRadiusModifier, changed: EMPTY } : arcRadiusModifier;
  }
  defaultColour(index: number, length = 0): string {
    let atIndex = index % this.colourSet.length;
    if (atIndex === 0 && index + 1 === length) {
      atIndex = (index + 1) % this.colourSet.length;
    }
    return this.colourSet[atIndex];
  }
}
