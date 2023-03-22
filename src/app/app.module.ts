import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CookieService } from 'ngx-cookie-service';
import { SalesChartComponent } from './modules/app-admin/app-statistics/sales-chart/sales-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { HeaderBarComponent } from './modules/app-admin/layout/header-bar/header-bar.component';
import { BackgroundPhotoCustomizationComponent } from './modules/app-admin/app-customization/background-photo-customization/background-photo-customization.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditCategoryComponent } from './modules/app-admin/app-menu/editors/edit-category/edit-category.component';
import { SubmitBarComponent } from './modules/app-admin/app-menu/editors/submit-bar/submit-bar.component';
import { EditorCategoryNameComponent } from './modules/app-admin/app-menu/editors/field-editors/editor-category-name/editor-category-name.component';
import { EditorCategoryDescriptionComponent } from './modules/app-admin/app-menu/editors/field-editors/editor-category-description/editor-category-description.component';
import { EditItemGroupComponent } from './modules/app-admin/app-menu/editors/edit-item-group/edit-item-group.component';
import { EditorItemGroupNameComponent } from './modules/app-admin/app-menu/editors/field-editors/editor-item-group-name/editor-item-group-name.component';
import { EditorItemGroupDescriptionComponent } from './modules/app-admin/app-menu/editors/field-editors/editor-item-group-description/editor-item-group-description.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { LoginSuccessComponent } from './modules/app-login/login-success/login-success.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
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
    SocialLoginModule,
    // TODO import only for admin page
    NgChartsModule,
    ColorPickerModule,
    DragDropModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '387933337523-7jvks23cg4as7m488aikod4draeij3ob.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err: any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
