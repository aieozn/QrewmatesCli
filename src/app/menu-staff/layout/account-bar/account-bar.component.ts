import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-bar',
  templateUrl: './account-bar.component.html',
  styleUrls: ['./account-bar.component.scss']
})
export class AccountBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public logout() {
    this.router.navigate(['/menu/R00000000000']);
  }
}
