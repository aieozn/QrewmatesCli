import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-full-width-dialog',
  templateUrl: './full-width-dialog.component.html',
  styleUrls: ['./full-width-dialog.component.scss']
})
export class FullWidthDialogComponent implements OnInit, OnDestroy {

  scrollIntroductionPercentage = 0;
  show = false;

  
  @ViewChild('cardbody') cardBody!: ElementRef;
  private readonly onDestroy = new Subject<void>();

  @Input('title') title: string | undefined;

  @Output('close') onClose = new EventEmitter<void>();
  
  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  onScroll(event: any) {
    this.scrollIntroductionPercentage = Math.min(event.target.scrollTop / 50, 1);
  }

  getShadowStyle() : { [klass: string]: any; } {
    var opacity = 0.5 * this.scrollIntroductionPercentage;

    var style = {
      'box-shadow': '0px 0px 10px 0px rgba(0, 0, 0, ' + opacity + ')',
      '-moz-box-shadow': '0px 0px 10px 0px rgba(0, 0, 0, ' + opacity + ')',
      '-webkit-box-shadow': '0px 0px 10px 0px rgba(0, 0, 0, ' + opacity + ')',
    }

    return style;
  }

  getMaxBodyHeight() : string {
    // 70% of window height - height of header (65px)
    return window.innerHeight * 0.7 - 65 + 'px';
  }

  getScrollTopStyle() : { [klass: string]: any; } {
    var style = {
      'opacity': this.scrollIntroductionPercentage
    }

    return style;
  }

  goToTop() {
    this.cardBody.nativeElement.scrollTop = 0;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  close() {
    this.onClose.emit();
  }
}

