import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AboutUsComponent } from '../footer/about-us/about-us.component';
import { CliDialogBodyContent } from './model/generic-dialog-body-content';
import { DialogBodyHost } from './model/dialog-body-host';
import { DialogBodyItem } from './model/dialog-body-item';
import { MenuCliDialogService } from './service/generic-dialog.service';

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss']
})
export class GenericDialogComponent implements OnInit, OnDestroy {

  private openMenuDialogSubscription : Subscription;
  private closeMenuDialogSubscription : Subscription;
  scrollIntroductionPercentage = 0;
  show = false;
  title: string | undefined;

  @ViewChild('cardbody') cardBody!: ElementRef;
  @ViewChild(DialogBodyHost, {static: true}) dialogBodyHost!: DialogBodyHost;
  
  constructor(
    dialogService: MenuCliDialogService
  ) {
    this.openMenuDialogSubscription = dialogService.openMenuDialog.subscribe(this.openMenu.bind(this));
    this.closeMenuDialogSubscription = dialogService.closeMenuDialog.subscribe(this.close.bind(this));
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
    return window.innerHeight * 0.7 + 'px';
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
    this.openMenuDialogSubscription.unsubscribe();
    this.closeMenuDialogSubscription.unsubscribe();
  }

  close() {
    this.show = false;
    document.body.style.overflow = 'auto';
  }
  
  openMenu(data: DialogBodyItem) {
    this.show = true;
    this.title = data.title;
    document.body.style.overflow = 'hidden';

    if (this.dialogBodyHost !== undefined) {
      this.dialogBodyHost.viewContainerRef.clear();
      var component = this.dialogBodyHost.viewContainerRef.createComponent<CliDialogBodyContent>(data.component);
      component.instance.setData(data.data);
    }
  }
}
