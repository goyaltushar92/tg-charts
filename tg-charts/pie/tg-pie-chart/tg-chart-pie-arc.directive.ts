import { Directive, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { TgChartPieArcGroupDirective } from './tg-chart-pie-arc-group.directive';



@Directive({
    selector: '[tgChartPieArc]',
    exportAs: 'pieArc'
})
export class TgChartPieArcDirective implements OnChanges, OnDestroy {
    @Input()
    value!: number;
    @Input()
    outerRadius = 0;
    @Input()
    innerRadius = 0;

    start = 0;
    end = 0;

    get path(): string {
        const startXM = Math.cos(this.start);
        const startYM = Math.sin(this.start);
        const endXM = Math.cos(this.end);
        const endYM = Math.sin(this.end);
        const useLargeArc = this.end - this.start < Math.PI ? 0 : 1;
        return `M${this.outerRadius * startXM},${this.outerRadius * startYM}A${this.outerRadius},${this.outerRadius},0,${useLargeArc},1,${this.outerRadius * endXM},${this.outerRadius * endYM}` +
            `L${this.innerRadius * endXM},${this.innerRadius * endYM}A${this.innerRadius},${this.innerRadius},0,${useLargeArc},0,${this.innerRadius * startXM},${this.innerRadius * startYM}Z`;
    }

    ngOnChanges(change: SimpleChanges): void {
        if (change.value) {
            this.arcsGroup.refreshAngleInfo.emit();
        }
    }
    constructor(private arcsGroup: TgChartPieArcGroupDirective) {
        this.arcsGroup.register(this);
        this.arcsGroup.refreshAngleInfo.emit();
    }
    ngOnDestroy(): void {
        this.arcsGroup.unregister(this);
        this.arcsGroup.refreshAngleInfo.emit();
    }
}
