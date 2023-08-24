import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-full-width-dialog',
  templateUrl: './full-width-dialog.component.html',
  styleUrls: ['./full-width-dialog.component.scss']
})
export class FullWidthDialogComponent implements OnDestroy {

  show = false;

  
  @ViewChild('cardbody') cardBody!: ElementRef;
  private readonly onDestroy = new Subject<void>();

  @Input('title') title: string | undefined;

  @Output('close') onClose = new EventEmitter<void>();

  getMaxBodyHeight() : string {
    // 70% of window height - height of header (55px)
    return window.innerHeight * 0.7 - 55 + 'px';
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  close() {
    this.onClose.emit();
  }
}

