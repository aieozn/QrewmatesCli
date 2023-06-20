import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor-price',
  templateUrl: './editor-price.component.html',
  styleUrls: ['./editor-price.component.scss']
})
export class EditorPriceComponent {
  @Input('currency')
  currency : string | undefined;

  @Input('control')
  control : FormControl<string | null> | undefined;
}
