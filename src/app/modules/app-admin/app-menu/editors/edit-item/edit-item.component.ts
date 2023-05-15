import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MenuItemDetailedGet, MenuItemGet } from '@common/api-client/models';
import { EditorDialogService } from '../editor-dialog.service';
import { ElementEditorDirective } from '../../elementEditorDirective';
import { MenuItemControllerService } from '@common/api-client/services';
import { AccountService } from '@common/account-utils/services/account.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { AllergensComponent } from './allergens/allergens.component';
import { SelectsComponent } from './selects/selects.component';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss', '../edit-element.scss']
})
export class EditItemComponent implements OnDestroy {

  @ViewChild(ElementEditorDirective, {static: true}) elementEditorHost!: ElementEditorDirective;
  
  originalItem: MenuItemGet | undefined;
  fullItem: MenuItemDetailedGet | undefined;
  
  private readonly onDestroy = new Subject<void>();

  itemFields = {
    itemFields: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    itemDescription: new FormControl('', [Validators.maxLength(512)])
  };

  constructor(
    private editDialogService: EditorDialogService,
    private itemService: MenuItemControllerService,
    private accountService: AccountService
  ) {
    
  }

  @Input() set item(value: MenuItemGet) {
    this.originalItem = value;
    this.loadItemDetails(value)
  }

  isValid(validation: {[key: string] : FormControl}) : boolean {
    return !Object.values(validation).map(e => e.invalid).includes(true);
  }

  isUpdated(validation: {[key: string] : FormControl}) : boolean {
    return Object.values(validation).map(e => e.dirty).includes(true);
  }

  onSave() {
    throw 'Not implemented yet'
  }

  cancel() {
    this.editDialogService.closeDialog();
  }

  onDelete() {
    throw 'Not implemented yet'
  }

  loadItemDetails(item: MenuItemGet) {
    this.itemService.getItemDetails({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemRef: item.ref
    }).pipe(
      takeUntil(this.onDestroy),
      tap(e => this.fullItem = e),
      tap(e => this.openSelects(e))
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  openAllergens(item: MenuItemDetailedGet) {
    const viewContainerRef = this.elementEditorHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(AllergensComponent);
    componentRef.instance.item = item;
  }

  openSelects(item: MenuItemDetailedGet) {
    const viewContainerRef = this.elementEditorHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(SelectsComponent);
    componentRef.instance.item = item;
  }
}
