import { Component, Input, ViewChild, ElementRef, HostListener } from '@angular/core';

import { MapLetters, mapLetters, MapNumbers, mapNumbers } from './map-data'

const hwRatio = 1080 / 1527;
type TransformStyle = {
  transform: string;
};


@Component({
  selector: 'sw-galaxy-map',
  templateUrl: './sw-galaxy-map.component.html',
  styleUrls: ['./sw-galaxy-map.component.scss']
})
export class SwGalaxyMapComponent {
  mapLetters: MapLetters = mapLetters;
  mapNumbers: MapNumbers = mapNumbers;
  @Input() selectedId: string = 'V18';
  @ViewChild('container') container: ElementRef;
  style: Element;
  mapSize: TransformStyle = { transform: 'scale(0)' };

  @HostListener('window:resize', ['$event'])
  @HostListener('window:load', ['$event'])
  setMapSize() {
    const cWidth = this.container.nativeElement.clientWidth;
    const cHeight = this.container.nativeElement.clientHeight;

    let mWidth;
    if (cHeight/cWidth > hwRatio) mWidth = cWidth;
    else mWidth = cHeight / hwRatio;
    this.mapSize = { transform: `scale(${mWidth / 1527})` };
  }
}
