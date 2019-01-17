import { Component, Input, OnInit, ViewChild, ElementRef, DoCheck, AfterViewChecked, AfterContentInit, AfterContentChecked, AfterViewInit, HostListener, OnChanges } from '@angular/core';

import { MapLetters, mapLetters, MapNumbers, mapNumbers } from './map-data'

type TableStyle = null | {
  height: string;
  width?: string;
}
const hwRatio = 1080 / 1527;
type MapStyle = null | {
  width: string;
  height: string;
};


@Component({
  selector: 'sw-galaxy-map',
  templateUrl: './sw-galaxy-map.component.html',
  styleUrls: ['./sw-galaxy-map.component.scss']
})
export class SwGalaxyMapComponent implements OnInit, DoCheck, AfterContentInit {
  mapLetters: MapLetters = mapLetters;
  mapNumbers: MapNumbers = mapNumbers;
  @Input() selectedId: string = 'V18';
  @ViewChild('container') container: ElementRef;
  @ViewChild('map') map: ElementRef;
  tableStyle: TableStyle = null;
  mapSize: MapStyle = {
    width: '0px',
    height: '0px'
  };

  @HostListener('window:resize', ['$event'])
  @HostListener('window:load', ['$event'])
  setMapSize() {
    const cWidth = this.container.nativeElement.clientWidth;
    const cHeight = this.container.nativeElement.clientHeight;
    console.log('==============================');
    console.log('cHeight:',cHeight, 'cWidth:',cWidth);
    console.log('calculated hwRatio:', cHeight/cWidth);
    if (cHeight/cWidth > hwRatio) {
      this.mapSize = {
        width: cWidth + 'px',
        height: String(cWidth * hwRatio) + 'px'
      };
    }
    else {
      this.mapSize = {
        width: String(cHeight / hwRatio) + 'px',
        height: cHeight + 'px'
      };
    }
    console.log(this.mapSize);
    console.log('mapSize hwRatio: ' + Number(this.mapSize.height.slice(0, -2))/Number(this.mapSize.width.slice(0, -2)));
  }

  ngOnInit() {
    console.log('hwRatio:', hwRatio);
    //this.setMapSize();
    //this.container.nativeElement.onresize = this.setMapSize;
  }

  ngDoCheck() {
    this.setMapSize();
    this.map.nativeElement.style.display = 'none';
    this.setMapSize();
    this.map.nativeElement.style.display = 'block';
  }

  ngAfterContentInit() {
    /*this.setMapSize();
    this.map.nativeElement.style.display = 'none';
    this.setMapSize();
    this.map.nativeElement.style.display = 'block';*/
  }
}
