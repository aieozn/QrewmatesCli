import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-editor-category-description',
  templateUrl: './editor-category-description.component.html',
  styleUrls: ['./editor-category-description.component.scss', '../common/field-editor.scss']
})
export class EditorCategoryDescriptionComponent {
  @Output('onUpdate')
  onUpdate = new EventEmitter<void>();

  @Input('category')
  public category: {
    description?: string
  } | undefined;

  public setDescription(target: any | null) {
    if (this.category && target && target.value) {
      let value = target.value;
      this.category.description = value;
      this.onUpdate.emit();
    }
  }
}
