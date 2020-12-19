import { Directive, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ArcRadiusInfo, ArcRadiusModifierComplex, ARC_RADIUS_MODIFIER } from './arc-radius-modifier';

@Directive({
    selector: 'tg-chart-pie[tgChartDoughnut]',
    providers: [{
        provide: ARC_RADIUS_MODIFIER,
        useExisting: forwardRef(() => TgDoughnutChartDirective),
        multi: true
    }]
})
export class TgDoughnutChartDirective extends ArcRadiusModifierComplex implements OnChanges {
    // tslint:disable-next-line: no-input-rename
    @Input('tgChartDoughnut')
    innerRadiusMultiplier = 0.66;

    changed = new EventEmitter<void>();
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.innerRadiusMultiplier) {
            this.changed.emit();
        }
    }
    modifier(arcInfo: ArcRadiusInfo): ArcRadiusInfo {
        return {
            outerRadius: arcInfo.outerRadius,
            innerRadius: this.innerRadiusMultiplier * arcInfo.outerRadius
        };
    }
}
