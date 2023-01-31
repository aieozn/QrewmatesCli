import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';
import { MenuCategoryControllerService } from 'src/app/openapi-cli/services';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { EditCategoryComponent } from './editors/edit-category/edit-category.component';
import { ElementEditorDirective } from './elementEditorDirective';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss', './menu-element-drag-drop-list.scss']
})
export class AdminMenuComponent {

  @ViewChild(ElementEditorDirective, {static: true}) elementEditorHost!: ElementEditorDirective;
  
  public categories: {
    category: MenuCategoryGet,
    open: boolean
  }[] = [];

  constructor(
    menuCategoryService: MenuCategoryControllerService,
    accountService: AccountService
  ) {
    menuCategoryService.getCategories({
      restaurantRef: accountService.getRestaurantRef()
    }).subscribe(loadedCategories => {
      for (let loadedCategory of loadedCategories) {
        this.categories.push({
          category: loadedCategory,
          open: false
        })
      }

      this.editCategory(this.categories[0].category);
    })
  }

  public extendCategory(category: MenuCategoryGet) {
    this.closeCategories();
    this.categories.filter(e => e.category.ref === category.ref)[0].open = true;
  }

  public closeCategories() {
    for (let category of this.categories) {
      category.open = false;
    }
  }

  public editCategory(category: MenuCategoryGet) {

    const viewContainerRef = this.elementEditorHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(EditCategoryComponent);
    componentRef.instance.category = category;
    // componentRef.instance.data = adItem.data;
  }
}
