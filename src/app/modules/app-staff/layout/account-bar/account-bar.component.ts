import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-bar',
  templateUrl: './account-bar.component.html',
  styleUrls: ['./account-bar.component.scss']
})
export class AccountBarComponent {

  constructor(private router: Router) { }

  logout() {
    this.router.navigate(['/']);
  }
}
