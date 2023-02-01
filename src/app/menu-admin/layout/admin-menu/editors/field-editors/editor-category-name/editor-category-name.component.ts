import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-editor-category-name',
  templateUrl: './editor-category-name.component.html',
  styleUrls: ['./editor-category-name.component.scss', '../common/field-editor.scss']
})
export class EditorCategoryNameComponent {
  @Output('onUpdate')
  onUpdate = new EventEmitter<void>();

  @Input('category')
  category: {
    name: string
  } | undefined;

  public setName(target: any | null) {
    if (this.category && target && target.value) {
      let value = target.value;
      this.category.name = value;
      this.onUpdate.emit();
    }
  }
}
