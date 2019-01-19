import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MapName, DetailedMapService } from '../../../services/detailed-map-highlight/detailed-map.service'

const MAPS_NAMES: Array<MapName> = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV'];

interface mapEl {
  name: string;
  src: string;
}

@Component({
  selector: 'detailed-map',
  templateUrl: './detailed-map.component.html',
  styleUrls: ['./detailed-map.component.scss']
})
export class DetailedMapComponent implements OnInit {
  highlight$: Observable<MapName>;
  highlight: MapName = null;
  fullScreen$: Observable<MapName>;
  fullScreen: MapName = null;
  readonly maps: mapEl[] = MAPS_NAMES.map(mapName => ({
    name: mapName,
    src: `../../../../assets/${mapName}.jpg`
  }));
  
  constructor(private detailedMapService: DetailedMapService) {}

  ngOnInit() {
    this.highlight$ = this.detailedMapService.selectedMap$;
    this.highlight$.subscribe(h => {
      if (!this.fullScreen) this.highlight = h;
      else this.highlight = null;
    });
    this.fullScreen$ = this.detailedMapService.fullScreen$;
    this.fullScreen$.subscribe(fs => this.fullScreen = fs);
  }

  mapClass$(mapName: MapName) {
    return this.highlight$.pipe( map(highlight => highlight && mapName == highlight ? 'highlight' : '') );
  }

  mapFullScreen$(mapName: MapName) {
    return this.fullScreen$.pipe( map(fullScreen => fullScreen && mapName == fullScreen ? true : false) );
  }

  openFullScreen(mapName: MapName) { this.detailedMapService.openFullScreen(mapName); }

  closeFullScreen() { this.detailedMapService.closeFullScreen(); }
}
