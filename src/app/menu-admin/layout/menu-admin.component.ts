import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent {

  constructor(private router: Router) { }

  public logout() {
    this.router.navigate(['/menu/R00000000000']);
  }

}
