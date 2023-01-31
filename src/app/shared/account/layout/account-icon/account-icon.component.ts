import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-icon',
  templateUrl: './account-icon.component.html',
  styleUrls: ['./account-icon.component.scss']
})
export class AccountIconComponent {
  // TODO manage real account
  public boxHeight: number = 0;
  public fontSize: number = 0;

  public userIconFontColor = '#c21d8e';
  public userIconBackgroundColor = '#FFFFFF';
  public userNameFontColor = '#FFFFFF'

  @Input('theme')
  set theme(value: 'DARK' | 'LIGHT') {
    if (value === 'LIGHT') {
      this.userIconFontColor = '#c21d8e';
      this.userIconBackgroundColor = '#FFFFFF';
      this.userNameFontColor = '#FFFFFF'
    } else if (value === 'DARK') {
      this.userIconFontColor = '#FFFFFF';
      this.userIconBackgroundColor = '#c21d8e';
      this.userNameFontColor = '#272727'
    }
  }

  @Input('height')
  set height(value: number) {
    this.boxHeight = value;
    this.fontSize = 10 + (Math.sqrt(value));
  }
}
