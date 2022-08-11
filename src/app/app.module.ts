import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MenuCategoryComponent } from './menu-cli/layout/menu-category/menu-category.component';
import { MenuItemComponent } from './menu-cli/layout/menu-category/menu-item/menu-item.component';
import { MenuHorizontalElementComponent } from './menu-cli/layout/menu-horizontal/menu-horizontal-element/menu-horizontal-element.component';
import { MenuHorizontalComponent } from './menu-cli/layout/menu-horizontal/menu-horizontal.component';
import { MenuCliComponent } from './menu-cli/layout/menu-cli.component';
import { AboutUsComponent } from './menu-cli/layout/footer/about-us/about-us.component';
import { MenuCliDialogComponent } from './menu-cli/menu-cli-dialog/menu-cli-dialog.component';
import { DialogBodyHost } from './menu-cli/menu-cli-dialog/model/dialog-body-host';
import { OrderMenuItemComponent } from './menu-cli/layout/order/order-menu-item/order-menu-item.component';
import { OrderMenuSelectComponent } from './menu-cli/layout/order/order-menu-select/order-menu-select.component';
import { OrderMenuToppingComponent } from './menu-cli/layout/order/order-menu-topping/order-menu-topping.component';
import { OrderMenuChiefNoteComponent } from './menu-cli/layout/order/order-menu-chief-note/order-menu-chief-note.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CounterFooterComponent } from './menu-cli/layout/order/order-menu-item/counter-footer/counter-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuCliComponent,
    MenuHorizontalComponent,
    MenuHorizontalElementComponent,
    MenuCategoryComponent,
    MenuItemComponent,
    MenuCliDialogComponent,
    AboutUsComponent,
    DialogBodyHost,
    OrderMenuItemComponent,
    OrderMenuSelectComponent,
    OrderMenuToppingComponent,
    OrderMenuChiefNoteComponent,
    CounterFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
