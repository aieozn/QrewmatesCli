import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLoginRoutingModule } from './app-login-routing.module';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AccountUtilsModule } from '@common/account-utils/account-utils.module';
import { LoginPageComponent } from './login-page.component';
import { FormsModule } from '@angular/forms';
import { SelectOrganizationComponent } from './layout/select-organization/select-organization.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    SelectOrganizationComponent
  ],
  imports: [
    CommonModule,
    AppLoginRoutingModule,
    SocialLoginModule,
    AccountUtilsModule,
    FormsModule
  ],
  providers: [
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
        onError: (err: string) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ]
})
export class AppLoginModule { }
