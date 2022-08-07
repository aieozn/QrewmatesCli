import { Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AboutUsComponent } from './body/about-us/about-us.component';
import { DialogBodyHost } from './model/dialog-body-host';
import { MenuCliDialogService } from './service/menu-cli-dialog.service';

@Component({
  selector: 'app-menu-cli-dialog',
  templateUrl: './menu-cli-dialog.component.html',
  styleUrls: ['./menu-cli-dialog.component.scss']
})
export class MenuCliDialogComponent implements OnInit, OnDestroy {

  private scrollIntroductionSizePx = 30;
  private openMenuDialogSubscription : Subscription | undefined;
  scrollIntroductionPercentage = 0;
  show = false;

  @ViewChild('cardbody') cardBody: ElementRef | undefined;
  @ViewChild(DialogBodyHost, {static: true}) dialogBodyHost!: DialogBodyHost;
  
  constructor(
    dialogService: MenuCliDialogService
  ) {
    this.openMenuDialogSubscription = dialogService.openMenuDialog.subscribe(this.openMenu.bind(this));
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
    if (this.cardBody) {
      this.cardBody.nativeElement.scrollTop = 0;
    }
  }

  ngOnDestroy(): void {
    if (this.openMenuDialogSubscription !== undefined) {
      this.openMenuDialogSubscription.unsubscribe();
      this.openMenuDialogSubscription = undefined;
    }
  }

  close() {
    this.show = false;
    document.body.style.overflow = 'auto';
  }
  
  openMenu() {
    this.show = true;
    document.body.style.overflow = 'hidden';

    console.error(this.dialogBodyHost)
    if (this.dialogBodyHost !== undefined) {
      this.dialogBodyHost.viewContainerRef.clear();
      this.dialogBodyHost.viewContainerRef.createComponent(AboutUsComponent);
    }
  }
}

