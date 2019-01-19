import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type MapName = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X' | 'XI' | 'XII' | 'XIII' | 'XIV' | null;

@Injectable({
  providedIn: 'root'
})
export class DetailedMapService {
  selectedMap$: BehaviorSubject<MapName> = new BehaviorSubject(null);
  fullScreen$: BehaviorSubject<MapName> = new BehaviorSubject(null);

  selectMap(mapName) {
    this.selectedMap$.next(mapName);
  }
  openFullScreen(mapName: MapName) {
    this.fullScreen$.next(mapName);
  }
  closeFullScreen() {
    this.fullScreen$.next(null);
  }
}
