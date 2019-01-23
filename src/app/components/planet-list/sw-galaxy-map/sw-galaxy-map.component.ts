import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

import { MapLetters, mapLetters, MapNumbers, mapNumbers } from './map-data';
import { GalaxyMapService, Location } from '../../../services/galaxy-map/galaxy-map.service';

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
export class SwGalaxyMapComponent implements OnInit, AfterViewInit {
  mapLetters: MapLetters = mapLetters;
  mapNumbers: MapNumbers = mapNumbers;
  selectedLocation: string = '';
  zoomedLocation: string = '';
  @ViewChild('container') container: ElementRef;
  mapZoom: TransformStyle | null = { transform: `scale(0)` };
  scale: string = '';
  translate: string = '';
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
  }

  ngAfterViewInit() {
    setTimeout(() => this.setMapSize(), 1000);
  }

  private setMapZoom(): void {
    this.mapZoom = { transform: `${this.scale} ${this.translate}` };
  }

  @HostListener('window:resize')
  private setMapSize(centerX?: number, centerY?: number) {
    const cWidth = this.container.nativeElement.clientWidth;
    const cHeight = this.container.nativeElement.clientHeight;

    // calculation of the map width (mWidth) based on the container dimensions
    let mWidth: number;
    if (cHeight/cWidth > hwRatio) mWidth = cWidth;
    else mWidth = cHeight / hwRatio;

    if (this.zoomOn) {
      const offsetX = (cWidth/2 - centerX) / this.scaleFullMap;
      const offsetY = (cHeight/2 - centerY) / this.scaleFullMap;
      this.translate = `translate(${offsetX}px, ${offsetY}px)`;
      this.setMapZoom();
      this.scale = `scale(${this.scaleFullMap * zoomScale})`;
      setTimeout(() => this.setMapZoom(), 500); // two phase transform due to Firefox non-synchronous transformations
      //this.mapZoom = {transform: `scale(${this.scaleFullMap * zoomScale}) ${this.translate}`};
    } else {
      this.scaleFullMap = mWidth / mapResolutionX;
      this.scale = `scale(${this.scaleFullMap})`;
      this.setMapZoom();
      if (this.translate) {
        this.translate = '';
        setTimeout(() => this.setMapZoom(), 500);
      }
    }
  }

  private zoomIn(el: Element | Location) {
    const td: Element = typeof el === 'string' ? document.getElementById(el) : el;
    if (!td) return;

    this.zoomedLocation = td.id;
    const containerRect = this.container.nativeElement.getBoundingClientRect();
    const tdRect = td.getBoundingClientRect();
    const tdCenterX = tdRect.left - containerRect.left + tdRect.width/2;
    const tdCenterY = tdRect.top - containerRect.top + tdRect.height/2;
    this.zoomOn = true;
    this.setMapSize(tdCenterX, tdCenterY);
  }

  zoomInEvent(event: Event) {
    if (this.zoomOn) return;
    event.stopPropagation();
    const td = <Element>event.currentTarget;
    this.mapService.toggleLocationZoom(td);
  }

  private zoomOff() {
    if (!this.zoomOn) return;
    this.zoomedLocation = null;
    this.zoomOn = false;
    this.setMapSize();
  }

  zoomOffEvent() {
    this.mapService.toggleLocationZoom(null);
  }

  tdClass(location: Location) {
    return location === this.selectedLocation || location === this.zoomedLocation ? 'selected' : null;
  }
}
