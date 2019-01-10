import { Component, Input, Output, EventEmitter, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

type Style = {
  top: string;
  left: string;
  height: string;
  width?: string;
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() src: string = '';
  @Input() title: string = '';
  @Input() fullScreen$: Observable<boolean>;
  @Output() openFullScreen = new EventEmitter<string>();
  @Output() closeFullScreen = new EventEmitter<void>();
  @ViewChild('frame') frame: ElementRef;
  @ViewChild('image') image: ElementRef;
  frameClass: string = 'image';
  currentFrameStyle: Style | null = null;
  currentImageStyle: Style | null = null;
  fullScreenOn: boolean = false;
  posFrameStyle: Style;
  posImageStyle: Style;

  ngOnInit() {
    this.fullScreen$.subscribe(fullScreen => {
      if (!this.fullScreenOn && fullScreen) {
        this.fullScreenOn = true;
        this.posFrameStyle = this.getPositionStyle(this.frame);
        this.currentFrameStyle = this.posFrameStyle;
        this.posImageStyle = this.getPositionStyle(this.image, false);
        this.currentImageStyle = this.posImageStyle;
        this.frameClass = 'image full-screen open-start';
        setTimeout(() => {
          this.frameClass = 'image full-screen end';
          this.currentFrameStyle = null;
          this.currentImageStyle = null;
        }, 50);
      } else if (this.fullScreenOn && !fullScreen) {
        this.frameClass = 'image full-screen close-end';
        this.currentFrameStyle = this.posFrameStyle;
        this.currentImageStyle = this.posImageStyle;
        setTimeout(() => {
          this.frameClass = 'image';
          this.currentFrameStyle = null;
          this.currentImageStyle = null;
          this.fullScreenOn = false;
        }, 1000);
      }
    });
  }

  getPositionStyle(el: ElementRef, width: boolean = true): Style {
    const rect = el.nativeElement.getBoundingClientRect();
    const posStyle: Style = {
      top: rect.top + 'px',
      left: rect.left + 'px',
      height: rect.height + 'px',
    };
    if (width) posStyle.width = rect.width + 'px';
    return posStyle;
  }

  openFS() { this.openFullScreen.emit(this.title); }
  closeFS() { this.closeFullScreen.emit(); }
}
