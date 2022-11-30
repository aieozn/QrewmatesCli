import { Component, OnInit } from '@angular/core';
import { OrderInstanceControllerService } from 'src/app/openapi-cli/services';

@Component({
  selector: 'app-menu-staff',
  templateUrl: './menu-staff.component.html',
  styleUrls: ['./menu-staff.component.scss']
})
export class MenuStaffComponent implements OnInit {

  // TODO change services names OrderInstanceControllerService -> OrderInstanceService (and the same for others)
  constructor(
    private orderInstanceService: OrderInstanceControllerService
  ) { }

  ngOnInit(): void {
  }

}
