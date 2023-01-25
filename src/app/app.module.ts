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
import { GenericDialogComponent } from './shared/generic-dialog/layout/generic-dialog/generic-dialog.component';
import { OrderMenuChiefNoteComponent } from './shared/order-form/layout/order-menu-chief-note/order-menu-chief-note.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OrdeSubmitComponent } from './shared/order-form/layout/order-submit/order-submit.component';
import { MenuHorizontalElementWrapperComponent } from './shared/menu-horizontal/layout/content/menu-horizontal-element-wrapper/menu-horizontal-element-wrapper.component';
import { MenuHorizontalWrapperComponent } from './shared/menu-horizontal/layout/content/menu-horizontal-wrapper/menu-horizontal-wrapper.component';
import { OrderStatusPipe } from './menu-staff/layout/pipes/order-status.pipe';
import { FooterPoweredByComponent } from './shared/footer/layout/footer-powered-by/footer-powered-by.component';
import { OrderMenuItemComponent } from './shared/order-form/layout/order-menu-item/order-menu-item.component';
import { OrderMenuSelectComponent } from './shared/order-form/layout/order-menu-select/order-menu-select.component';
import { OrderMenuToppingComponent } from './shared/order-form/layout/order-menu-topping/order-menu-topping.component';
import { OrderSummaryComponent } from './shared/order-form/layout/order-summary/order-summary.component';
import { CounterFooterComponent } from './shared/order-form/layout/order-menu-item/counter-footer/counter-footer.component';
import { PaymentMethodComponent } from './shared/order-form/layout/order-summary/payment-method/payment-method.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { PendingOrderComponent } from './menu-staff/layout/pending-order/pending-order.component';
import { WaitForOrderDialogComponent } from './menu-cli/layout/wait-for-order-dialog/wait-for-order-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CookieService } from 'ngx-cookie-service';
import { ErrorDialogComponent } from './shared/error-dialog/layout/error-dialog/error-dialog.component';
import { DoOrderActionDialogComponent } from './menu-staff/layout/do-order-action-dialog/do-order-action-dialog.component';
import { MenuStaffComponent } from './menu-staff/layout/menu-staff.component';
import { MenuAdminComponent } from './menu-admin/layout/menu-admin.component';
import { AccountBarComponent } from './menu-staff/layout/account-bar/account-bar.component';
import { AccountIconComponent } from './shared/account/layout/account-icon/account-icon.component';
import { AdminOrdersComponent } from './menu-admin/layout/admin-orders/admin-orders.component';
import { AdminMenuComponent } from './menu-admin/layout/admin-menu/admin-menu.component';
import { AdminHistoryComponent } from './menu-admin/layout/admin-history/admin-history.component';
import { AdminStatisticsComponent } from './menu-admin/layout/admin-statistics/admin-statistics.component';
import { AdminTeamComponent } from './menu-admin/layout/admin-team/admin-team.component';
import { SalesChartComponent } from './menu-admin/layout/admin-statistics/sales-chart/sales-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { AdminCustomizationComponent } from './menu-admin/layout/admin-customization/admin-customization.component';
import { LogoCustomizationComponent } from './menu-admin/layout/admin-customization/logo-customization/logo-customization.component';

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
    MenuHorizontalElementWrapperComponent,
    MenuHorizontalWrapperComponent,
    OrderStatusPipe,
    FooterPoweredByComponent,
    PendingOrderComponent,
    WaitForOrderDialogComponent,
    ErrorDialogComponent,
    DoOrderActionDialogComponent,
    MenuAdminComponent,
    AccountIconComponent,
    AdminOrdersComponent,
    AdminMenuComponent,
    AdminHistoryComponent,
    AdminStatisticsComponent,
    AdminTeamComponent,
    SalesChartComponent,
    AdminCustomizationComponent,
    LogoCustomizationComponent
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
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatProgressSpinnerModule,
    // TODO import only for admin page
    NgChartsModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
