import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MenuCategoryGet, MenuItemGroupGet } from 'src/app/openapi-cli/models';
import { EditorDialogService } from '../editors/editor-dialog.service';

@Component({
  selector: 'app-menu-category-items',
  templateUrl: './menu-category-items.component.html',
  styleUrls: ['./menu-category-items.component.scss', '../menu-element-drag-drop-list.scss']
})
export class MenuCategoryItemsComponent implements OnDestroy {

  @Output('openItemGroupEditor')
  openItemGroupEditor = new EventEmitter<{
    group: MenuItemGroupGet,
    categoryRef: string
  }>();

  public _category: MenuCategoryGet | undefined;
  private readonly onDestroy = new Subject<void>();

  @Input() set category(value: MenuCategoryGet) {
    this._category = value;
  }

  constructor(private editorDialogService: EditorDialogService) {
    this.editorDialogService.onItemGroupUpdated.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(e => this.itemGroupUpdated(e))
  }

  public openEditor(menuItemGroup: MenuItemGroupGet) {
    if (this._category) {
      this.openItemGroupEditor.emit({
        group: menuItemGroup,
        categoryRef: menuItemGroup.categoryRef
      })
    } else {
      throw 'Category not defined';
    }
  }

  private itemGroupUpdated(newItemGroup: MenuItemGroupGet) {
    if (!this._category) { throw 'Category not defined'; }
    if (newItemGroup.categoryRef !== this._category.ref) { return; }

    for (let i = 0; i < this._category.menuItemGroups.length; i++) {
      let existingItemGroup = this._category.menuItemGroups[i];
      if (existingItemGroup.ref === newItemGroup.ref) {
        this._category.menuItemGroups[i] = newItemGroup;
        this.editorDialogService.closeDialog();
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
