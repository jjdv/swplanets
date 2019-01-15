import { Component, Input, OnInit, ViewChild, ElementRef, DoCheck, AfterViewChecked, AfterContentInit, AfterContentChecked, AfterViewInit, HostListener } from '@angular/core';

import { MapLetters, mapLetters, MapNumbers, mapNumbers } from './map-data'

type TableStyle = null | {
  height: string;
  width?: string;
}
const hwRatio = 1080 / 1527;
type MapStyle = null | {
  'max-width': string;
  'max-height': string;
};


@Component({
  selector: 'sw-galaxy-map',
  templateUrl: './sw-galaxy-map.component.html',
  styleUrls: ['./sw-galaxy-map.component.scss']
})
export class SwGalaxyMapComponent implements OnInit {
  mapLetters: MapLetters = mapLetters;
  mapNumbers: MapNumbers = mapNumbers;
  @Input() selectedId: string = 'V18';
  @ViewChild('container') container: ElementRef | null = null;
  tableStyle: TableStyle = null;
  mapStyle: MapStyle = null;

  @HostListener('window:resize', ['$event'])
  @HostListener('window:load', ['$event'])
  setMapSize() {
    const img = this.container.nativeElement.querySelector('img');
    img.classList.add('no-display');
    //const mapSpace = this.container.nativeElement.getBoundingClientRect();
    this.mapStyle = {
      'max-width': this.container.nativeElement.clientWidth + 'px',
      'max-height': this.container.nativeElement.clientHeight + 'px'
    };
    img.classList.remove('no-display');
  }

  ngOnInit() {
    this.setMapSize();
    //this.container.nativeElement.onresize = this.setMapSize;
    //alert(`height: ${rect.height}px\nwidth: ${rect.width}px`);
    //console.log('container.nativeElement', this.container.nativeElement);
  }

  ngOnChanges() {
    this.setMapSize()
  }

  /*setTableStyle(img: Element) {
    if (img) {
      const imgRect = img.getBoundingClientRect();
      this.tableStyle = {
        height: imgRect.height + 'px',
        width: imgRect.width + 'px'
      }
    }
  }*/
  
  /*ngDoCheck() {
    if (this.container.nativeElement) {
      const imgRect = this.container.nativeElement.getBoundingClientRect();
      if (imgRect.height && imgRect.width) {
        this.tableStyle = {
          height: imgRect.height + 'px',
          width: imgRect.width + 'px'
        }
      }
    }
  }*/
}
