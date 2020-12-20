import { EventEmitter } from '@angular/core';

/**
 * common behaviors for directives and component that needs destroy event
 */

export abstract class Destroyable {
    /**
     * destroying event
     */
    destroying = new EventEmitter();
    /**
     * function to be called when destroying
     */
    onDestroy(): void {
        this.destroying.emit();
        this.destroying.complete();
    }
}
