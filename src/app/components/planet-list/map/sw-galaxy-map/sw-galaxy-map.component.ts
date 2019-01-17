import { Component, Input, ViewChild, ElementRef, DoCheck, HostListener } from '@angular/core';

import { MapLetters, mapLetters, MapNumbers, mapNumbers } from './map-data'

type TableStyle = null | {
  transform: string;
}
const hwRatio = 1080 / 1527;
type SizeStyle = null | {
  width?: string;
  height?: string;
  transform?: string;
};


@Component({
  selector: 'sw-galaxy-map',
  templateUrl: './sw-galaxy-map.component.html',
  styleUrls: ['./sw-galaxy-map.component.scss']
})
export class SwGalaxyMapComponent implements DoCheck {
  mapLetters: MapLetters = mapLetters;
  mapNumbers: MapNumbers = mapNumbers;
  @Input() selectedId: string = 'V18';
  @ViewChild('container') container: ElementRef;
  @ViewChild('map') map: ElementRef;
  style: Element;
  tableCellSize: SizeStyle;
  mapSize: SizeStyle = {
    width: '0px',
    height: '0px'
  };

  @HostListener('window:resize', ['$event'])
  @HostListener('window:load', ['$event'])
  setMapSize() {
    this.map.nativeElement.style.display = 'none';
    const cWidth = this.container.nativeElement.clientWidth;
    const cHeight = this.container.nativeElement.clientHeight;

    let mWidth, mHeight;
    if (cHeight/cWidth > hwRatio) {
      mWidth = cWidth;
      mHeight = String(cWidth * hwRatio);
    }
    else {
      mWidth = String(cHeight / hwRatio);
      mHeight = cHeight;
    }
    this.mapSize = { transform: `scale(${mWidth / 1527})` };
    this.map.nativeElement.style.display = 'block';
  }

  ngDoCheck() {
    this.setMapSize();
  }
}
