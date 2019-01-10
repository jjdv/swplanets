import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type mapName = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X' | 'XI' | 'XII' | 'XIII' | 'XIV' | null;

@Injectable({
  providedIn: 'root'
})
export class DetailedMapService {
  highlight$: BehaviorSubject<mapName> = new BehaviorSubject(null);
  fullScreen$: BehaviorSubject<mapName> = new BehaviorSubject(null);

  highlight(mapName) {
    this.highlight$.next(mapName);
  }
  openFullScreen(mapName: mapName) {
    this.fullScreen$.next(mapName);
  }
  closeFullScreen() {
    this.fullScreen$.next(null);
  }
}
