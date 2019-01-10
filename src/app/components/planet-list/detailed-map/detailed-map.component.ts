import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { mapName, DetailedMapService } from '../../../services/detailed-map-highlight/detailed-map.service'

const MAPS_NAMES: Array<mapName> = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV'];

interface mapEl {
  name: string;
  src: string;
}

@Component({
  selector: 'app-detailed-map',
  templateUrl: './detailed-map.component.html',
  styleUrls: ['./detailed-map.component.scss']
})
export class DetailedMapComponent implements OnInit {
  highlight$: Observable<mapName>;
  highlight: mapName = null;
  fullScreen$: Observable<mapName>;
  fullScreen: mapName = null;
  readonly maps: mapEl[] = MAPS_NAMES.map(mapName => ({
    name: mapName,
    src: `../../../../assets/${mapName}.jpg`
  }));
  
  constructor(private detailedMapService: DetailedMapService) {}

  ngOnInit() {
    this.highlight$ = this.detailedMapService.highlight$;
    this.highlight$.subscribe(h => {
      if (!this.fullScreen) this.highlight = h;
      else this.highlight = null;
    });
    this.fullScreen$ = this.detailedMapService.fullScreen$;
    this.fullScreen$.subscribe(fs => this.fullScreen = fs);
  }

  mapClass$(mapName: mapName) {
    return this.highlight$.pipe( map(highlight => highlight && mapName == highlight ? 'highlight' : '') );
  }

  mapFullScreen$(mapName: mapName) {
    return this.fullScreen$.pipe( map(fullScreen => fullScreen && mapName == fullScreen ? true : false) );
  }

  openFullScreen(mapName: mapName) { this.detailedMapService.openFullScreen(mapName); }

  closeFullScreen() { this.detailedMapService.closeFullScreen(); }
}
