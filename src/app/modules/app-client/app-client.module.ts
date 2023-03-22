import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppClientRoutingModule } from './app-client-routing.module';
import { AppClientComponent } from './layout/app-client.component';
import { MatIconModule } from '@angular/material/icon';
import { WaitForOrderDialogComponent } from './layout/wait-for-order-dialog/wait-for-order-dialog.component';
import { MenuCategoryCliComponent } from './layout/menu-category-cli/menu-category-cli.component';
import { MenuItemGroupComponent } from './layout/menu-category-cli/menu-item-group/menu-item-group.component';
import { FooterAboutUsComponent } from './layout/footer/footer-about-us/footer-about-us.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FullWidthDialogModule } from 'src/app/common/full-width-dialog/full-width-dialog.module';
import { OrderComposerModule } from 'src/app/common/order-composer/order-composer.module';
import { FooterPoweredByComponent } from './layout/footer/footer-powered-by/footer-powered-by.component';
import { MenuHorizontalModule } from 'src/app/common/menu-horizontal/menu-horizontal.module';
import { ApiClientModule } from 'src/app/common/api-client/api-client.module';


@NgModule({
  declarations: [
    FooterAboutUsComponent,
    MenuItemGroupComponent,
    MenuCategoryCliComponent,
    WaitForOrderDialogComponent,
    AppClientComponent,
    WaitForOrderDialogComponent,
    FooterPoweredByComponent
  ],
  imports: [
    CommonModule,
    AppClientRoutingModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FullWidthDialogModule,
    OrderComposerModule,
    MenuHorizontalModule,
    ApiClientModule
  ]
})
export class AppClientModule { }
