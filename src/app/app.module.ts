import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuCliComponent } from './layout/menu-cli/menu-cli.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MenuHorizontalComponent } from './layout/menu-cli/menu-horizontal/menu-horizontal.component';
import { MenuHorizontalElementComponent } from './layout/menu-cli/menu-horizontal/menu-horizontal-element/menu-horizontal-element.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuCliComponent,
    MenuHorizontalComponent,
    MenuHorizontalElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
