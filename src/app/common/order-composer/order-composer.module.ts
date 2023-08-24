import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdeSubmitComponent } from './layout/order-submit/order-submit.component';
import { OrderMenuItemComponent } from './layout/order-menu-item/order-menu-item.component';
import { OrderMenuSelectComponent } from './layout/order-menu-select/order-menu-select.component';
import { OrderSummaryComponent } from './layout/order-summary/order-summary.component';
import { OrderMenuToppingComponent } from './layout/order-menu-topping/order-menu-topping.component';
import { CounterFooterComponent } from './layout/order-menu-item/counter-footer/counter-footer.component';
import { PaymentMethodComponent } from './layout/order-summary/payment-method/payment-method.component';
import { OrderMenuChiefNoteComponent } from './layout/order-menu-chief-note/order-menu-chief-note.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { FullWidthDialogModule } from '../full-width-dialog/full-width-dialog.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { OrderDetailsComponent } from './layout/order-details/order-details.component';
import { StatusLineModule } from '../components/status-line/status-line.module';



@NgModule({
  declarations: [
    OrdeSubmitComponent,
    OrderMenuItemComponent,
    OrderMenuSelectComponent,
    OrderMenuToppingComponent,
    OrderSummaryComponent,
    CounterFooterComponent,
    PaymentMethodComponent,
    OrderMenuChiefNoteComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    FullWidthDialogModule,
    MatInputModule,
    StatusLineModule
  ],
  exports: [
    OrdeSubmitComponent,
    OrderDetailsComponent
  ]
})
export class OrderComposerModule { }
