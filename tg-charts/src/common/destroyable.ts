import { EventEmitter, OnDestroy } from '@angular/core';

export abstract class Destroyable {
    destroyed = new EventEmitter();
    onDestroy(): void {
        this.destroyed.emit();
        this.destroyed.complete();
    }
}
