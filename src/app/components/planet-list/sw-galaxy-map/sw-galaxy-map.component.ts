import { Component, OnInit, AfterContentInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

import { MapLetters, mapLetters, MapNumbers, mapNumbers } from './map-data';
import { GalaxyMapService, Location } from '../../../services/galaxy-map-highlight/galaxy-map.service';

const mapResolutionX = 2400;
const mapResolutionY = 1695;
const hwRatio = mapResolutionY / mapResolutionX;
const zoomScale = 5;

type TransformStyle = {
  transform: string;
};


@Component({
  selector: 'sw-galaxy-map',
  templateUrl: './sw-galaxy-map.component.html',
  styleUrls: ['./sw-galaxy-map.component.scss']
})
export class SwGalaxyMapComponent implements OnInit, AfterContentInit, AfterViewInit {
  mapLetters: MapLetters = mapLetters;
  mapNumbers: MapNumbers = mapNumbers;
  selectedLocation: string = '';
  zoomedLocation: string = '';
  @ViewChild('container') container: ElementRef;
  mapZoom: TransformStyle | null = null;
  offsetX: number;
  offsetY: number;
  scaleFullMap: number;
  scaleTransitionOn: boolean = false;
  zoomOn: boolean = false;

  constructor(private mapService: GalaxyMapService) {}

  ngOnInit() {
    this.mapService.selectedLocation$.subscribe( selectedLocation => this.selectedLocation = selectedLocation );
    this.mapService.zoomedLocation$.subscribe( zoomedLocation => {
      if (zoomedLocation) this.zoomIn(zoomedLocation)
      else this.zoomOff()
    });
    setTimeout(() => this.scaleTransitionOn = true, 500);
  }

  ngAfterContentInit() {
    this.setMapSize();
  }

  ngAfterViewInit() {
  }

  @HostListener('window:resize', ['$event'])
  setMapSize(centerX?: number, centerY?: number) {
    const cWidth = this.container.nativeElement.clientWidth;
    const cHeight = this.container.nativeElement.clientHeight;

    let mWidth: number;
    if (cHeight/cWidth > hwRatio) mWidth = cWidth;
    else mWidth = cHeight / hwRatio;
    if (this.zoomOn) {
      this.offsetX = (cWidth/2 - centerX) / this.scaleFullMap;
      this.offsetY = (cHeight/2 - centerY) / this.scaleFullMap;
      this.mapZoom = {
        transform: `scale(${this.scaleFullMap * zoomScale}) translate(${this.offsetX}px, ${this.offsetY}px)`
      };
    } else {
      this.scaleFullMap = mWidth / mapResolutionX;
      this.mapZoom = { transform: `scale(${this.scaleFullMap})` };
    }
  }

  zoomIn(el: Element | Location) {
    const td: Element = typeof el === 'string' ? document.getElementById(el) : el;
    if (!td) return;

    this.zoomedLocation = td.id;
    const containerRect = this.container.nativeElement.getBoundingClientRect();
    const tdRect = td.getBoundingClientRect();
    const tdCenterX = tdRect.left - containerRect.left + tdRect.width/2;
    const tdCenterY = tdRect.top - containerRect.top + tdRect.height/2;
    this.zoomOn = true;
    this.container.nativeElement.classList.add('zoom');
    this.setMapSize(tdCenterX, tdCenterY);
  }

  zoomInEvent(event: Event) {
    if (this.zoomOn) return;
    event.stopPropagation();
    const td = <Element>event.currentTarget;
    this.mapService.toggleLocationZoom(td);
  }

  zoomOff() {
    if (!this.zoomOn) return;
    this.zoomedLocation = null;
    this.zoomOn = false;
    this.container.nativeElement.classList.remove('zoom');
    this.setMapSize();
  }

  zoomOffEvent() {
    this.mapService.toggleLocationZoom(null);
  }

  tdClass(location: Location) {
    return location === this.selectedLocation || location === this.zoomedLocation ? 'selected' : null;
  }
}
