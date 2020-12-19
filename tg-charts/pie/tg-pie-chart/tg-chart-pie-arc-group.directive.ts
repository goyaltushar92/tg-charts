import { Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { TgChartPieArcDirective } from './tg-chart-pie-arc.directive';



@Directive({
    selector: '[tgChartPieArcGroup]'
})
export class TgChartPieArcGroupDirective implements OnChanges, OnInit, OnDestroy {
    arcs: TgChartPieArcDirective[] = [];
    @Input()
    padding = 0;
    refreshAngleInfo = new EventEmitter();

    constructor() {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.padding) {
            this.refreshAngleInfo.emit();
        }
    }
    ngOnInit(): void {
        this.refreshAngleInfo.pipe(
            debounceTime(20)
        ).subscribe(() => this.updateAngleInfo());
    }
    register(arc: TgChartPieArcDirective): void {
        this.arcs.push(arc);
    }
    unregister(arc: TgChartPieArcDirective): void {
        const i = this.arcs.indexOf(arc);
        if (i > -1) {
            this.arcs.splice(i, 1);
        }
    }
    updateAngleInfo(): void {
        let end = 0;
        const anglePerValue = this.getAnglePerValue();
        for (const a of this.arcs) {
            a.start = end + this.padding;
            end = a.end = a.start + anglePerValue * a.value;
        }
    }
    getAnglePerValue(): number {
        const total = this.arcs.reduce((pv, cv) => pv + Math.abs(cv.value), 0);
        if (total) {
            const totalAngle = 2 * Math.PI;
            const angleInValue = totalAngle - this.padding * this.arcs.length;
            return angleInValue / total;
        } else {
            return 0;
        }
    }
    ngOnDestroy(): void {
        this.refreshAngleInfo.complete();
    }
}
