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
import { MenuItemComponent } from './menu-cli/layout/menu-category/menu-item-group/menu-item-group.component';
import { MenuHorizontalElementComponent } from './shared/menu-horizontal/layout/menu-horizontal/menu-horizontal-element/menu-horizontal-element.component';
import { MenuHorizontalComponent } from './shared/menu-horizontal/layout/menu-horizontal/menu-horizontal.component';
import { MenuCliComponent } from './menu-cli/layout/menu-cli.component';
import { AboutUsComponent } from './menu-cli/layout/footer/about-us/about-us.component';
import { GenericDialogComponent } from './menu-cli/layout/generic-dialog/generic-dialog.component';
import { DialogBodyHost } from './menu-cli/layout/generic-dialog/model/dialog-body-host';
import { OrderMenuItemComponent } from './menu-cli/layout/order/order-menu-item/order-menu-item.component';
import { OrderMenuSelectComponent } from './menu-cli/layout/order/order-menu-select/order-menu-select.component';
import { OrderMenuToppingComponent } from './menu-cli/layout/order/order-menu-topping/order-menu-topping.component';
import { OrderMenuChiefNoteComponent } from './menu-cli/layout/order/order-menu-chief-note/order-menu-chief-note.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CounterFooterComponent } from './menu-cli/layout/order/order-menu-item/counter-footer/counter-footer.component';
import { OrderSummaryComponent } from './menu-cli/layout/order/order-summary/order-summary.component';
import { OrdeSubmitComponent } from './menu-cli/layout/order-submit/order-submit.component';
import { PaymentMethodComponent } from './menu-cli/layout/order/order-summary/payment-method/payment-method.component';
import { MenuStaffComponent } from './menu-waiter/layout/menu-staff/menu-staff.component';
import { AccountBarComponent } from './menu-waiter/layout/account-bar/account-bar.component';
import { MenuElementWrapperComponent } from './shared/menu-horizontal/layout/content/menu-horizontal-element-wrapper/menu-horizontal-element-wrapper.component';
import { HorizontalMenuWrapperComponent } from './shared/menu-horizontal/layout/content/menu-horizontal-wrapper/menu-horizontal-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuCliComponent,
    MenuHorizontalComponent,
    MenuHorizontalElementComponent,
    MenuCategoryComponent,
    MenuItemComponent,
    GenericDialogComponent,
    AboutUsComponent,
    DialogBodyHost,
    OrderMenuItemComponent,
    OrderMenuSelectComponent,
    OrderMenuToppingComponent,
    OrderMenuChiefNoteComponent,
    CounterFooterComponent,
    OrderSummaryComponent,
    OrdeSubmitComponent,
    PaymentMethodComponent,
    MenuStaffComponent,
    AccountBarComponent,
    MenuElementWrapperComponent,
    HorizontalMenuWrapperComponent
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
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
