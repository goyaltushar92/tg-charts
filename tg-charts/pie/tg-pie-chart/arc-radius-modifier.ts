import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';


export type ArcRadiusModifier = ((arcInfo: ArcRadiusInfo) => ArcRadiusInfo) | ArcRadiusModifierComplex;

export const ARC_RADIUS_MODIFIER = new InjectionToken<(arcInfo: ArcRadiusInfo) => ArcRadiusInfo>('ARC_RADIUS_MODIFIER');

export interface ArcRadiusInfo {
    outerRadius: number;
    innerRadius: number;
}


export abstract class ArcRadiusModifierComplex {
    abstract changed: Observable<void>;
    abstract modifier(arcInfo: ArcRadiusInfo): ArcRadiusInfo;
}
