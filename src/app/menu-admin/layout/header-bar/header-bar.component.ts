import { Component } from '@angular/core';
import { CollectiveChangesService } from '../../services/collective-changes/collective-changes.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent {

  constructor(public collectiveChangesService: CollectiveChangesService) {
    
  }

  publish() {
    this.collectiveChangesService.publish.next();
  }
}
