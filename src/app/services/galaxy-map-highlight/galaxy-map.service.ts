import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type mapName = string | null;

@Injectable({
  providedIn: 'root'
})
export class GalaxyMapHighlightService  {
  map$: BehaviorSubject<mapName> = new BehaviorSubject(null);

  setMap(mapName) {
    this.map$.next(mapName);
  }
}
