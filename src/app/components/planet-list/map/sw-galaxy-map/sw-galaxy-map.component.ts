import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

import { MapLetters, mapLetters, MapNumbers, mapNumbers } from './map-data';
import { GalaxyMapHighlightService } from '../../../../services/galaxy-map-highlight/galaxy-map.service';

const hwRatio = 1080 / 1527;
type TransformStyle = {
  transform: string;
};


@Component({
  selector: 'sw-galaxy-map',
  templateUrl: './sw-galaxy-map.component.html',
  styleUrls: ['./sw-galaxy-map.component.scss']
})
export class SwGalaxyMapComponent implements OnInit {
  mapLetters: MapLetters = mapLetters;
  mapNumbers: MapNumbers = mapNumbers;
  selectedId: string = '';
  @ViewChild('container') container: ElementRef;
  mapSize: TransformStyle = { transform: 'scale(0)' };

  constructor(private highlight: GalaxyMapHighlightService) {
    this.highlight.map$.subscribe(
      map => this.selectedId = map
    );
  }

  @HostListener('window:resize', ['$event'])
  setMapSize() {
    const cWidth = this.container.nativeElement.clientWidth;
    const cHeight = this.container.nativeElement.clientHeight;

    let mWidth;
    if (cHeight/cWidth > hwRatio) mWidth = cWidth;
    else mWidth = cHeight / hwRatio;
    this.mapSize = { transform: `scale(${mWidth / 1527})` };
  }

  ngOnInit() {
    this.setMapSize();
  }
}
