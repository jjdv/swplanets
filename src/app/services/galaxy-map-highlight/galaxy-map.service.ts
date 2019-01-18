import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Location = string | null;

@Injectable({
  providedIn: 'root'
})
export class GalaxyMapService  {
  selectedLocation$: BehaviorSubject<Location> = new BehaviorSubject(null);
  zoomedLocation$: BehaviorSubject<Location | Element> = new BehaviorSubject(null);
  zoomed: boolean = false;

  selectLocation(location) {
    this.selectedLocation$.next(location);
  }

  toggleLocationZoom(location: Location | Element) {
    if (this.zoomed) this.zoomedLocation$.next(null);
    else this.zoomedLocation$.next(location);
    this.zoomed = !this.zoomed;
  }
}
