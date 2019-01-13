import { Component, Input, OnInit, ViewChild, ElementRef, DoCheck, AfterViewChecked, AfterContentChecked, AfterViewInit } from '@angular/core';

import { MapLetters, mapLetters, MapNumbers, mapNumbers } from './map-data'

type TableStyle = {
  height: string;
  width?: string;
}
const hwRatio = 1080 / 1528;


@Component({
  selector: 'sw-galaxy-map',
  templateUrl: './sw-galaxy-map.component.html',
  styleUrls: ['./sw-galaxy-map.component.scss']
})
export class SwGalaxyMapComponent {
  mapLetters: MapLetters = mapLetters;
  mapNumbers: MapNumbers = mapNumbers;
  @Input() selectedId: string;
  @ViewChild('mapImage') mapImage: ElementRef | null = null;
  tableStyle: TableStyle | null = null;

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
    if (this.mapImage.nativeElement) {
      const imgRect = this.mapImage.nativeElement.getBoundingClientRect();
      if (imgRect.height && imgRect.width) {
        this.tableStyle = {
          height: imgRect.height + 'px',
          width: imgRect.width + 'px'
        }
      }
    }
  }*/
}
